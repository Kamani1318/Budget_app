import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Controller} from 'react-hook-form';
import dayjs from 'dayjs';

export default function MyDate(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name = {props.name}
        control = {props.control}
        render={({
          field: {onChange, value},
        }) => (
          <DatePicker label={props.label} onChange={onChange}
          value={dayjs(value)} sx={{ width: '93%' }}/>
        )}
      />
    </LocalizationProvider>
  );
}