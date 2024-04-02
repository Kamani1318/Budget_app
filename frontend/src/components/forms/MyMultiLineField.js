import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';
export default function MyMultiLineField(props) {
  return (
    <Controller
    name = {props.name}
    control = {props.control}
    render={({
        field: {onChange, value},
        fieldState: {invalid, error},
        formState,
    }) => (
        <TextField
          id="outlined-multiline-flexible"
          label={props.label}
          multiline
          onChange={onChange}
          value={value}
          maxRows={4}
          placeholder = {props.placeholder}
        />
        )
    }
    />
  );
}
