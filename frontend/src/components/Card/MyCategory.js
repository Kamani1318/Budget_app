import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form';

export default function MyCategory(props) {


  return (
    <FormControl fullWidth style={{ width: '130px' }}>
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
            <MenuItem value={"Grocery"}>Grocery</MenuItem>
          <MenuItem value={"Dining"}>Dining</MenuItem>
          <MenuItem value={"Rent"}>Rent</MenuItem>
          <MenuItem value={"Bills"}>Bills</MenuItem>
          <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
          <MenuItem value={"Medicines"}>Medicines</MenuItem>
          <MenuItem value={"Gifts"}>Gifts</MenuItem>
          <MenuItem value={"Shopping"}>Shopping</MenuItem>
          <MenuItem value={"Commute"}>Commute</MenuItem>
        </Select>
            )
        }
        />
      </FormControl>
  );
}