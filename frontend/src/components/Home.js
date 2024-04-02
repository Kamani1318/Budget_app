import { React,useEffect,useMemo, useState } from 'react'
import AxiosInstance from './Axios'
import {MaterialReactTable,useMaterialReactTable,} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {Edit as EditIcon,Delete as DeleteIcon,} from '@mui/icons-material';
import Dayjs from 'dayjs';
import {Link} from 'react-router-dom';
const Home = () => {

  const [myData,setMyData] = useState([]);
  const [loading,setLoading] = useState(true);
  const GetData = () =>
  {
    AxiosInstance.get('projects/').then((res) => {
      setMyData(res.data)
      console.log(res.data)
      setLoading(false)
  })
  }

  useEffect(() => {
    GetData();
  }, [])
  
    const columns = useMemo(
      () => [
        {
          accessorKey: 'name', //access nested data with dot notation
          header: 'Name',
          size: 150,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
        },
        {
          accessorKey: 'comments', //normal accessorKey
          header: 'Comments',
          size: 200,
        },
        {
          accessorKey: 'start_date',
          header: 'Start Date',
          size: 150,
          Cell: (row) => Dayjs(row.value).format('DD-MM-YYYY'),
        },
        {
          accessorKey: 'end_date',
          header: 'End Date',
          size: 150,
          Cell: (row) => Dayjs(row.value).format('DD-MM-YYYY'),
        },
      ],
      [],
    );
    const memoizedData = useMemo(() => myData, [myData]);

    const table = useMaterialReactTable({
      columns,
      data: memoizedData,
      enableRowActions: true,
      renderRowActions: ({ row }) => (
        <Box>
          <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    });
  
  return (
    <div>
      { loading? <h1>Loading...</h1> :
      <MaterialReactTable 
      table={table} />
      }
    </div>
  );
};


export default Home;
