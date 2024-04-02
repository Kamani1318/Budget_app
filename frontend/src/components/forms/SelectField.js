import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form';
export default function SelectedField(props) {


  return (
      <FormControl fullWidth>
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
          <MenuItem value={"Closed"}>Closed</MenuItem>
          <MenuItem value={"Open"}>Open</MenuItem>
          <MenuItem value={"In Progress"}>In Progress</MenuItem>
        </Select>
            )
        }
        />
      </FormControl>
  );
}