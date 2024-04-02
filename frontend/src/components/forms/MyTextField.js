import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function MyTextField(props) {
  return (
    <Controller
    name = {props.name}
    control = {props.control}
    render={({
        field: {onChange, value},
        fieldState: {invalid, error},
        formState,
    }) => (
        <TextField id="outlined-basic" label={props.label} onChange={onChange}
        value={value} variant="outlined" placeholder={props.placeholder}/>
        )
    }
      />
  );
}