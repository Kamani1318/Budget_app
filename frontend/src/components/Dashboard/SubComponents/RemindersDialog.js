import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dayjs from 'dayjs';
import AxiosInstance from '../../Axios';
import ReminderCard from '../../ReminderCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import { IconButton } from '@mui/material';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [myData, setMyData] = useState([]);

  const refreshData = async () => {
    try {
      const response = await AxiosInstance.get('reminders/');
      setMyData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    refreshData();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultValues = {
    r_transaction_name: '',
    r_category: '',
    r_amount: '',
    r_transaction_date: '',
    r_mode_of_payment: '',
    r_description: ''
  }

  const form = useForm({ defaultValues: defaultValues });

  const submission = async (data) => {
    console.log(data)
    const transaction_date_converted = Dayjs(data.r_transaction_date).format('YYYY-MM-DD');
    try {
      await AxiosInstance.post(`reminders/`, {
        r_transaction_name: data.r_transaction_name,
        r_category: data.r_category,
        r_amount: data.r_amount,
        r_transaction_date: transaction_date_converted,
        r_mode_of_payment: data.r_mode_of_payment,
        r_description: data.r_description
      });
      setSubmittedData(null);
      reset(defaultValues);
      setSubmissionStatus('success');
      setOpenSnackbar(true);
      // Refresh the data
      refreshData();
    } catch (error) {
      console.error('Error posting to /reminders/', error);
      setSubmissionStatus('error');
    }
  }


  const deletesubmission = () => {
    if (!submittedData || !submittedData.id) {
      console.error('No data or data ID provided for deletion');
      return;
    }

    AxiosInstance.delete(`transactions/${submittedData.id}`)
      .then(() => {
        setSubmittedData(null);
      })
      .catch(error => {
        console.error(`Error deleting transaction with ID ${submittedData.id}`, error);
        setSubmissionStatus('error');
      });
  }

  const { handleSubmit, reset, control } = form;

  return (
    <React.Fragment>
      <Box sx={{ borderTop: '1px solid black', p: 2, boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', borderRadius: '100px', color: 'white', p: 1, width: '200px', height: '55px', margin: 'auto' }}>
          <IconButton onClick={handleClickOpen}>
            <AddCardIcon fontSize='large' sx={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h7">Add Reminder</Typography>
        </Box>
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxHeight: '500px', overflow: 'auto' } }}>
          <form onSubmit={handleSubmit(submission)}>
            <ReminderCard control={control} onDelete={deletesubmission} />
          </form>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={(event) => { handleSubmit(submission)(event); handleClose(); }}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Reminder submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </React.Fragment>
  );
}
