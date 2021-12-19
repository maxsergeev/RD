import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Controller, useFormContext} from "react-hook-form";
import {checkBool} from "../../../js/functions";
import {Grid} from "@mui/material";
import {ErrorMessage} from "@hookform/error-message";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";

const SelectInput = (props) => {
    const methods = useFormContext();
    return (

        <FormControl fullWidth sx={{marginBottom:props.mb, marginTop:props.mt}}>
            <InputLabel shrink id={props.value} error={props.err} style={{top:'14px'}}>
                {props.value   + ' ' + (props.requie ? '*' : '')} {/*Добавляем звёздочку только на тех полях где подвязана валидация*/}
            </InputLabel>
            <Controller
                name={props.name}
                control={methods.control}
                render={({field : {onChange, value}}) => (
                    <Select
                        variant="filled"
                        labelId={props.value}
                        id={props.value}
                        label={props.value}
                        onChange={onChange}
                        value={value}
                        defaultValue=""
                        error={props.err}
                    >
                        {props.stage.map((item,key)=> (
                            <MenuItem key={key} value={checkBool(item, props.stage)}>{item}</MenuItem>
                        ))}
                    </Select>

                )}

            />
            {
                props.err ?
                <FormHelperText error={true}>Выберете {props.value} </FormHelperText>
                :
                null
            }

        </FormControl>

    );
}

export default SelectInput;
