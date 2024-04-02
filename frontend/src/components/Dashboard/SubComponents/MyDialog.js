import React, { useState } from 'react';
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
import ExpenseCard from '../../ExpenseCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import { IconButton } from '@mui/material';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

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
    transaction_name: '',
    category: '',
    amount: '',
    transaction_date: '',
    mode_of_payment: '',
    description: ''
  }

  const form = useForm({ defaultValues: defaultValues });

  const submission = (data) => {
    const transaction_date_converted = Dayjs(data.transaction_date).format('YYYY-MM-DD');
    AxiosInstance.post(`transactions/`, {
      transaction_name: data.transaction_name,
      category: data.category,
      amount: data.amount,
      transaction_date: transaction_date_converted,
      mode_of_payment: data.mode_of_payment,
      description: data.description
    })
      .then((response) => {
        setSubmittedData(null);
        reset(defaultValues);
        setSubmissionStatus('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error posting to /transactions/', error);
        setSubmissionStatus('error');
      });
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
          <Typography variant="h7">Add Transaction</Typography>
        </Box>
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxHeight: '500px', overflow: 'auto' } }}>
          <form onSubmit={handleSubmit(submission)}>
            <ExpenseCard control={control} onDelete={deletesubmission} />
          </form>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={(event) => { handleSubmit(submission)(event); handleClose(); }}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Transaction submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </React.Fragment>
  );
}
