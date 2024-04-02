import React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import RemindersDialog from './RemindersDialog';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ScrollableListOfReminders from './ScrollableListOfReminders';

export default function TransactionList(props) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '15px', position: 'relative' }}>
        <Typography variant="h6" style={{ color: 'black', fontWeight: 'bold' }}>Bill Reminders</Typography>
      </div>
      <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexGrow: 1 }}>
        <Typography variant="body" color="black" sx={{ mx: 2,fontWeight: 'bold' }}>
            Transaction Number
          </Typography>
          <Typography variant="body" color="black" sx={{ mx: 2,fontWeight: 'bold' }}>
            Category
          </Typography>
          <Typography variant="body" color="black" sx={{ mx: 2,fontWeight: 'bold' }}>
            Amount
          </Typography>
          <Typography variant="body" color="black" sx={{ mx: 1.5,fontWeight: 'bold' }}>
            Transaction Date
          </Typography>
        </Box>
        <Box>
        </Box>
      </Card>
      <Box sx={{ p: 2 }}>
        <ScrollableListOfReminders sx={{ border: '1px solid black' }} />
      </Box>
        <Card>
          <RemindersDialog />
        </Card>
    </Card>
  )
}
