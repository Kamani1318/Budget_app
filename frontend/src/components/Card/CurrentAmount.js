import React from 'react'
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';
export default function CurrentAmount(props) {
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
          id="standard-number"
          label={props.label}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
          value={value}
          variant="standard"
          placeholder={props.placeholder}
        />
        )
    }
      />
  )
}

