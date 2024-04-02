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

function renderCell({ columnIndex, rowIndex, style, data }) {
    let content;
    const item = data[rowIndex]; // Access the data for this row
    const date = new Date(item.transaction_date);
    const formattedDate = date.toLocaleDateString('en-GB');
    // console.log("Item")
    // console.log(item.transaction_name)
    if (columnIndex === 0) {
      content = <Checkbox inputProps={{ 'aria-label': `checkbox-${rowIndex}` }} />;
    } else if (columnIndex === 1) {
      content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{item.transaction_name}</Typography>;
    } else if (columnIndex === 2) {
      content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{item.category}</Typography>; // Use data
    } else if (columnIndex === 3) {
      content = <Typography fontSize="0.875rem" color='grey' fontWeight='bold'>{item.amount}</Typography>; // Use data
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
  
  export default function VirtualizedList() {
    const [myData,setMyData] = useState([]);
    const [loading,setLoading] = useState(true);
  
    const GetData = () => {
        AxiosInstance.get('transactions/').then((res) => {
          // Sort the data in descending order of date
          const sortedData = res.data.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
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