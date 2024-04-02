import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form';

export default function Mode_of_Payment(props) {


  return (
    <FormControl fullWidth style={{ width: '150px' }}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Controller
        name = {props.name}
        control = {props.control}
        render={({
            field: {onChange, value},
            fieldState: {invalid, error},
            formState,
        }) => (
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={onChange}
            value={value}
            
            >
            <MenuItem value={"Bank"}>Bank</MenuItem>
          <MenuItem value={"Paytm"}>Paytm</MenuItem>
          <MenuItem value={"Cash"}>Cash</MenuItem>
        </Select>
            )
        }
        />
      </FormControl>
  );
}