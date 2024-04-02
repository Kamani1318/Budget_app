import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AxiosInstance from './Axios';
import {useNavigate,useParams} from 'react-router-dom';

const Delete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    const [myData,setMyData] = useState([]);
    const [loading,setLoading] = useState(true);
    const GetData = () =>
  {
    AxiosInstance.get(`projects/${MyId}`).then((res) => {
      setMyData(res.data)
      console.log(res.data)
      setLoading(false)
  })
  }

  useEffect(() => {
    // console.log('MyId',MyId)
    GetData();
  }, [])

    const navigate = useNavigate();

    const submission = (data) => {
        AxiosInstance.delete(`projects/${MyId}/`)
        .then(() => {
            // If the post is successful, set the submission status to 'success'
            navigate(`/`)
        })
    }
    return (
        <div>
        {loading ? <div>Loading...</div> : 
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box height={300} width="100%" my={4} display="flex" alignItems="center" gap={4} p={2} sx={{ border: '2px solid grey' }}>
                Are you sure about Deleting this Project? {myData.name}
            </Box>
            <Box height={300} width="100%" my={4} display="flex" alignItems="center" gap={4} p={2} sx={{ border: '2px solid grey' }}>
                {myData.start_date}
            </Box>
            <Button variant="contained" onClick={submission}>Delete</Button>
        </div>
        }
    </div>
    )
}

export default Delete