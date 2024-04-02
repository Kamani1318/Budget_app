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
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [myData, setData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickOpen = () => {
    setData(props.data);
    setOpen(true);
    for (let field in props.data) {
      setValue(field, props.data[field]);
    }
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
  };

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const form = useForm({ defaultValues: defaultValues });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const submission = (myData) => {
    console.log("In submission function of EditDialog");
    console.log(myData.id);
    const transaction_date_converted = Dayjs(myData.transaction_date).format('YYYY-MM-DD');
    if (!myData.id || !transaction_date_converted) {
      console.error('Invalid data');
      return;
    }
    AxiosInstance.put(`transactions/${myData.id}/`, {
      transaction_name: myData.transaction_name,
      category: myData.category,
      amount: myData.amount,
      transaction_date: transaction_date_converted,
      mode_of_payment: myData.mode_of_payment,
      description: myData.description
    })
      .then((response) => {
        setSubmittedData(null);
        reset(defaultValues);
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error posting to /transactions/', error);
        setSubmissionStatus('error');
      });
  };

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
  };

  const { handleSubmit, reset, setValue, control } = form;

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          '&:hover': {
            backgroundColor: 'white', // Change background color on hover
            color: 'black', // Change icon color on hover
          },
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: '500px', // Example to set maximum height to 90% of the viewport height
            overflow: 'auto', // Enables scrolling for the content inside the dialog
          },
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Bill</DialogTitle>
        <form onSubmit={handleSubmit(submission)}>
          <ExpenseCard control={control} onDelete={deletesubmission} data={myData} />
        </form>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(event) => {
            handleSubmit(submission)(event);
            handleClose();
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Transaction Edited Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
