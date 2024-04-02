import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import MyMultiLineField from './forms/MyMultiLineField';
import MyTextField from './forms/MyTextField';
import SelectedField from './forms/SelectField';
import MyDatePicker from './forms/MyDatePicker';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate,useParams} from 'react-router-dom';

const Edit = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
    const [loading,setLoading] = useState(true);
    const GetData = () =>
  {
    AxiosInstance.get(`projects/${MyId}`).then((res) => {
      console.log(res.data)
      setValue('name',res.data.name)
        setValue('start_date',Dayjs(res.data.start_date))
        setValue('end_date',Dayjs(res.data.end_date))
        setValue('Comments',res.data.comments)
        setValue('Status',res.data.status)
      setLoading(false)
  })
  }

  useEffect(() => {
    // console.log('MyId',MyId)
    GetData();
  }, [])

    const navigate = useNavigate();
    const defaultValues = {
        name: '',
        start_date: '',
        end_date: '',
        Comments: '',
        Status: ''
    }

    const [submissionStatus, setSubmissionStatus] = useState('');

    const form = useForm({defaultValues:defaultValues});
    if (!form) {
        // handle error, e.g. return null or some fallback UI
        return null;
    }
    const submission = (data) => {
        const startDate = Dayjs(data.start_date).format('YYYY-MM-DD');
        const endDate = Dayjs(data.start_date).format('YYYY-MM-DD');
        AxiosInstance.put(`projects/${MyId}/`,{
            name:data.name,
            status : data.Status,
            comments : data.Comments,
            start_date : startDate,
            end_date : endDate
        })
        .then(() => {
            // If the post is successful, set the submission status to 'success'
            navigate(`/`)
        })
        .catch(error => {
            console.error('Error posting to /projects/', error);
            setSubmissionStatus('error');
        });
    }
    const { handleSubmit, reset, setValue, control } = form;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit(submission)}>
            <Box
                height={300}
                width="100%"
                my={4}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ border: '2px solid grey' }}
            >
                <MyTextField label="name" name="name" control={control} placeholder="Enter Project Name"/>
                <MyDatePicker label="start_date" name="start_date" control={control} />
                <MyDatePicker label="end_date" name="end_date" control={control} />
            </Box>
            <Box
                height={300}
                width="100%"
                my={4}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ border: '2px solid grey' }}
            >
                <MyMultiLineField label="Comments" name="Comments" control={control} placeholder="Provide Project Comments"/>
                <SelectedField label="Status" name="Status" control={control} />
            </Box>
            <Button variant="contained" type="submit">Submit</Button>
            </form>
            {submissionStatus === 'success' && <p>Form submitted successfully!</p>}
            {submissionStatus === 'error' && <p>Error submitting form. Please try again.</p>}
        </div>
    )
}

export default Edit