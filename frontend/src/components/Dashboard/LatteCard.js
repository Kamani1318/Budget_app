import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import ProgressBar from './SubComponents/ProgressBar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function LatteCard(props) {
  const theme = useTheme();

  const percentageconverter = (amount) => {
    return (amount / 25000) * 100;
  };

  return (
    <Card sx={{ display: 'flex', borderRadius: '16px' }}>
      <BarChartIcon 
        fontSize="large" 
        sx={{ 
          backgroundColor: '#f5f5f5', 
          borderRadius: '50%', 
          position: 'relative', 
          left: '1%', 
          top: '3%',
          padding: '3px',
          fontSize: '2.5rem'
        }} 
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '20%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography 
          component="div" 
          variant="h6" 
          fontWeight="bold" 
          color="black"
          sx={{
            transition: 'font-size 0.3s', // Add transition for smooth animation
            '&:hover': {
              fontSize: '0.8rem', // Decrease font size on hover
            },
          }}
        >
          {props.title}
        </Typography>
        <Typography 
          variant="h4" 
          component="div" 
          fontWeight="bold" 
          sx={{ 
            color: '#19B5D1', 
            display: 'flex', 
            alignItems: 'center',
            transition: 'font-size 0.3s', // Add transition for smooth animation
            '&:hover': {
              fontSize: '3rem', // Increase font size on hover
            },
          }}
        >
          <CurrencyRupeeIcon fontSize="inherit" />
          {props.amount}
        </Typography>
          <ProgressBar progress={percentageconverter(props.amount)} />
        </CardContent>
      </Box>
    </Card>
  );
}