import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function Transaction_Name(props) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { invalid, error }, formState }) => (
        <TextField
          id="outlined-basic"
          label={props.label}
          multiline
          onChange={onChange}
          value={value}
          maxRows={4}
          style={{ width: '50%' }} // specify your desired width here
        />
      )}
    />
  );
}