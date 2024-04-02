import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MyAmount from './Card/MyAmount';       
import MyDate from './Card/MyDate';
import MyCategory from './Card/MyCategory';
import MyDescription from './Card/MyDescription';
import Mode_of_Payment from './Card/Mode_of_Payment';
import Transaction_Name from './Card/Transaction_Name';
import Grid from '@mui/material/Grid';
export default function ExpenseCard(props) {

  const handleClickDelete = (event) => {
    event.preventDefault();
    props.onDelete();
  };

  const data = props.data || {};

  return (
    <>
    <Card sx={{ width: '600px', height: '300px', boxShadow: 0 }}>
      <CardContent>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            {/* Transaction Name */}
            <Grid item xs={12}>
              <Transaction_Name label="Transaction Name" name="transaction_name" control={props.control} value={data.transaction_name}/>
            </Grid>

            {/* Category and Mode of Payment */}
            <Grid item xs={12} sm={4}>
              <MyCategory
                label="Category"
                name="category"
                control={props.control}
                value={data.category}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Mode_of_Payment
                label="Payment Mode"
                name="mode_of_payment"
                control={props.control}
                value={data.mode_of_payment}
                fullWidth
              />
            </Grid>

            {/* Transaction Date */}
            <Grid item xs={12} sm={4}>
              <MyDate
                label="Date"
                name="transaction_date"
                control={props.control}
                value={data.transaction_date}
                fullWidth
              />
            </Grid>

            {/* Amount */}
            <Grid item xs={12}>
              <MyAmount
                label="Amount"
                name="amount"
                control={props.control}
                value={data.amount}
                // Assuming MyAmount is a custom component that accepts 'fullWidth' or similar props for width control
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <MyDescription
                label="Description"
                name="description"
                control={props.control}
                value={data.description}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    </>
  );
}
