import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import MyDropDown from './MyDropDown';
import Typography from '@mui/material/Typography';
import AxiosInstance from '../../Axios';

export default function MyLineChart() {
  const [myData, setMyData] = useState([]);
  const [displayMode, setDisplayMode] = useState('Daily');

  const GetData = () => {
    AxiosInstance.get('transactions/').then((res) => {
      setMyData(res.data);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const groupedDataByDate = myData.reduce((acc, item) => {
    if (acc[item.transaction_date]) {
      acc[item.transaction_date] += parseFloat(item.amount);
    } else {
      acc[item.transaction_date] = parseFloat(item.amount);
    }
    return acc;
  }, {});

  // Convert groupedDataByDate into an array of objects
  const groupedDataArray = Object.entries(groupedDataByDate).map(([transaction_date, amount]) => ({ transaction_date, amount }));

  const transactionDates = groupedDataArray.map(item => {
    const date = new Date(item.transaction_date);
    return isNaN(date.getTime()) ? 'Invalid date' : date;
  }).sort((a, b) => a - b);

  const amounts = groupedDataArray.map(item => item.amount);

  const groupedDataByMonth = myData.reduce((acc, item) => {
    const date = new Date(item.transaction_date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format: MM-YYYY
    if (acc[monthYear]) {
      acc[monthYear] += parseFloat(item.amount);
    } else {
      acc[monthYear] = parseFloat(item.amount);
    }
    return acc;
  }, {});

  const groupedDataArrayByMonth = Object.entries(groupedDataByMonth).map(([monthYear, amount]) => {
    const [month, year] = monthYear.split('-').map(Number);
    // Creating a date object for the first day of each month
    const transaction_date = new Date(year, month -1 , 15);
    return { transaction_date, amount };
  });
  groupedDataArrayByMonth.sort((a, b) => a.transaction_date - b.transaction_date);
  const transactionMonths = groupedDataArrayByMonth.map(item => item.transaction_date);
  const monthlyAmounts = groupedDataArrayByMonth.map(item => item.amount);

  let dataToDisplay, xAxisData;
  switch(displayMode) 
  {
    case 'Monthly':
        dataToDisplay = monthlyAmounts;
        xAxisData = transactionMonths;
        break;
    case 'Weekly':
        // Assuming you have data prepared for weekly display
        break;
    case 'Daily':
    default:
        dataToDisplay = amounts;
        xAxisData = transactionDates;
        break;
  }
      return (
        <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '16px', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '15px', position: 'relative' }}>
            <Typography variant="h5" style={{ color: 'black', fontWeight: 'bold' }}>Expense Chart</Typography>
            <div style={{ position: 'absolute', right: '15px' }}>
              <MyDropDown setDisplayMode={setDisplayMode}/>
            </div>
          </div>
          <LineChart
            width={500}
            height={300}
            series={[
              { data: dataToDisplay, label: displayMode, lineWidth: 2 }, // Use displayMode as the label
            ]}
            xAxis={[
              { 
                scaleType: 'time', 
                data: xAxisData, 
              }
            ]}
          />
        </Card>
      );
}