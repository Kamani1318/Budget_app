import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LatteCard from './Dashboard/LatteCard';
import MyPieChart from './Dashboard/SubComponents/MyPieChart';
import MyLineChart from './Dashboard/SubComponents/MyLineChart';
import TransactionList from './Dashboard/SubComponents/TransactionList';
import BillReminder from './Dashboard/SubComponents/BillReminder';
export default function BasicGrid() {

  return (
    <Box sx={{ flexGrow: 1,backgroundColor: '#f5f5f5' }} >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {/* Total Spending (for the total accounts i have recorded)*/}
          <LatteCard title="Total Spendings" amount="3000"/>
        </Grid>
        <Grid item xs={4}>
           {/* Total Earning (for the total accounts i have recorded) */}
          <LatteCard title="Total Budget" amount="25000"/>
        </Grid>
        <Grid item xs={4}>
          {/* Total Balance (for the total accounts i have recorded) */}
          <LatteCard title="Total Balance" amount="22000"/>
        </Grid>
        <Grid item xs={6}>
          {/* Total spending this month (features: %increase or decrease from last month, line chart comparing different months) */}
          <MyLineChart />
        </Grid>
        <Grid item xs={6}>
          {/* Pie chart showing the expense split between different categories */}
          <MyPieChart />
        </Grid>
        <Grid item xs={6}>
          {/* A Transaction table showing the most Recent Transactions */}
          <TransactionList/>

        </Grid>
        <Grid item xs={6}>
          {/* A Weekly/daily/monthly comparison of expenses */}
          <BillReminder />
        </Grid>
      </Grid>
    </Box>
  );
}