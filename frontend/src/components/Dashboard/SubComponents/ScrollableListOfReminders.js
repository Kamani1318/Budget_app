import { React,useEffect,useMemo, useState } from 'react'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { VariableSizeGrid as Grid } from 'react-window';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import EditDialog from './EditDialog';
import AxiosInstance from '../../Axios';


  
  export default function VirtualizedList() {
    const [myData,setMyData] = useState([]);
    const [loading,setLoading] = useState(true);

    function handleDelete(id) {
      // Find the item in the myData array
      const item = myData.find(item => item.id === id);
    
      // Send a POST request to the Transactions API endpoint with the item data
      AxiosInstance.post('transactions/', {
        transaction_name: item.r_transaction_name,
        category: item.r_category,
        amount: item.r_amount,
        transaction_date: item.r_transaction_date,
        mode_of_payment: item.r_mode_of_payment,
        description: item.r_description
      }).then((res) => {
        console.log('Added to Transactions:', res);
      }).catch((error) => {
        console.error('Error adding to Transactions:', error);
      });
    
      // Then delete the item from the Reminders
      AxiosInstance.delete(`reminders/${id}`).then((res) => {
        // After the server responds, remove the item from the local state
        setMyData(prevData => prevData.filter(item => item.id !== id));
      });
    }
    function renderCell({ columnIndex, rowIndex, style, data }) {
      let content;
      const item = data[rowIndex]; // Access the data for this row
      const date = new Date(item.r_transaction_date);
      const formattedDate = date.toLocaleDateString('en-GB');
      // console.log("Item")
      // console.log(item.transaction_name)
      if (columnIndex === 0) {
        content = (
          <Checkbox 
            inputProps={{ 'aria-label': `checkbox-${rowIndex}` }} 
            onChange={() => handleDelete(item.id)} // Add this line
          />
        );
      } else if (columnIndex === 1) {
        content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{item.r_transaction_name}</Typography>;
      } else if (columnIndex === 2) {
        content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{item.r_category}</Typography>; // Use data
      } else if (columnIndex === 3) {
        content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{item.r_amount}</Typography>; // Use data
      } else if (columnIndex === 4) {
        content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{formattedDate}</Typography>; // Use data
      } else if (columnIndex === 5) {
        content = <EditDialog data={item}/>;
      }
  
      style = { ...style, backgroundColor: rowIndex % 2 === 0 ? 'lightturquoise' : 'white' };
    
      return (
        <ListItem style={style} key={rowIndex} component="div" disablePadding>
          <ListItemButton
              sx={{
                  '&:hover': {
                  backgroundColor: 'white', // Change background color on hover
                  '.MuiTypography-root': { // Change color of Typography components on hover
                      color: 'black',
                      fontWeight: 'bold'
                  },
                  },
              }}
              >
          <ListItemText primary={content} />
          </ListItemButton>
        </ListItem>
      );
    }
  
    const GetData = () => {
        AxiosInstance.get('reminders/').then((res) => {
          console.log(res)
          // Sort the data in descending order of date
          const sortedData = res.data.sort((a, b) => new Date(b.r_transaction_date) - new Date(a.r_transaction_date));
          setMyData(sortedData);
          setLoading(false);
        })
      }
  
    useEffect(() => {
      GetData();
    }, [])
  
    return (
      <Box
        sx={{ width: '100%', height: 400, maxWidth: 560, bgcolor: 'background.paper' }}
      >
        <Grid
          columnCount={6}
          columnWidth={index => (index === 0 || index === 5  || index=== 3 ? 70 : 120)}
          height={400}
          rowCount={myData.length} // Use the length of myData for rowCount
          rowHeight={() => 60} // Increase row height
          width={620}
          itemData={myData}
        >
          {renderCell} 
        </Grid>
      </Box>
    );
  }