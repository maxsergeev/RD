import React from 'react';
import {Grid, TextField, Typography, IconButton} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import SelectInput  from "../SelectInput/SelectInput";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {Controller, useFormContext} from "react-hook-form";

const WorkTime = (props) => {
    const [showOptions, setShowOptions] = React.useState(false)
    const hideOptions = () =>  setShowOptions(!showOptions)
    const methods = useFormContext();

    return (
        <>
            <Grid container item md={12} spacing={2} >
                <Grid  item md={12}>
                    <Typography
                        variant="h5"
                        component="h2">
                        График работы
                        <IconButton aria-label="arrow-down" onClick={hideOptions}>
                            {showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        </IconButton>
                    </Typography>
                </Grid>
            </Grid>
            {showOptions ? <>
            <Grid item md={2}>
                <Controller name={"whpFrom"}
                            control={methods.control}
                            defaultValue={props.defaultValues.whpFrom}
                            render={({field : { onChange, value}})=>(
                                <TextField
                                    variant="filled"
                                    onChange={onChange}
                                    value={value}
                                    id="time"
                                    label="С"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    fullWidth
                                />
                            )}
                />
            </Grid>
            <Grid item md={2}>
                <Controller name={"whpTill"}
                            control={methods.control}
                            defaultValue={props.defaultValues.whpTill}
                            render={({field : { onChange, value}})=>(
                            <TextField
                                variant="filled"
                                onChange={onChange}
                                value={value}
                                id="time"
                                label="ДО"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                fullWidth
                            />
                            )}
                />
            </Grid>
            <Grid item md={2}>
                <SelectInput
                    value="Овертаймы"
                    defaultValue={props.defaultValues.overtimes}
                    stage={props.dataSelect.overtimes}
                    name="overtime"
                />
            </Grid>
            <Grid item md={3}>
                <Controller name={"scheduleDescription"}
                            control={methods.control}
                            defaultValue={props.defaultValues.scheduleDescription}
                            render={({field : { onChange, value}})=>(
                                <TextField
                                    variant="filled"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={onChange}
                                           value={value}
                                           fullWidth
                                           id="outlined-basic"
                                           label="Возможный график"
                                            />
                            )}
                />

            </Grid>
            </> : null }
        </>
    );
}

export default WorkTime;
