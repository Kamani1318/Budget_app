import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import AxiosInstance from '../../Axios';
import Card from '@mui/material/Card';
import MyDropDown from './MyDropDown';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Added for convenience in styling

export default function MyPieChart() {
  const [myData, setMyData] = useState([]);

  const GetData = () => {
    AxiosInstance.get('transactions/').then((res) => {
      const groupedData = res.data.reduce((acc, item) => {
        if (acc[item.category]) {
          acc[item.category] += parseFloat(item.amount);
        } else {
          acc[item.category] = parseFloat(item.amount);
        }
        return acc;
      }, {});

      const transformedData = Object.entries(groupedData).map(([label, value], id) => ({
        id,
        value,
        label,
        // Add color property if the PieChart component supports it
      }));
      setMyData(transformedData);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  // Assume a custom color function or an array of colors
  const customColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
    '#949FB1', 'blue', '#FDB45C', '#97BBCD', '#9D9D9D'
  ];

  // Assign a color from the customColors array to each data entry
  const coloredData = myData.map((entry, index) => ({
    ...entry,
    color: customColors[index % customColors.length], // Loop over the colors
  }));

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '16px', padding: '15px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <Typography variant="h3" sx={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '1.5rem', // Adjust font size as needed
        }}>Expense Pie Chart</Typography>
        <MyDropDown />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'start', // Adjusted for alignment to start
        alignItems: 'center',
      }}>
        <PieChart
          series={[
            {
              data: coloredData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
            },
          ]}
          height={250}
          style={{ width: '50%' }} // Adjusted to control width
        />
      </Box>
    </Card>
  );
}
