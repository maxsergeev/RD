import React from 'react';
import {Grid, TextField, FormControlLabel, Checkbox, Typography, IconButton, RadioGroup,} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {Controller, useFormContext} from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import {useSelector} from "react-redux";



const Location = (props) => {
    const [showOptions, setShowOptions] = React.useState(false)
    const hideOptions = () =>  setShowOptions(!showOptions)
    const methods = useFormContext();

    return (
        <>
            <Grid item md={12}>
                <Typography
                    variant="h5"
                    component="h2">
                    Локация
                    <IconButton aria-label="arrow-down" onClick={() =>  hideOptions()}>
                        {showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </IconButton>
                </Typography>
            </Grid>
            {showOptions ? <>
            <Grid item md={4}>
                <Controller name={"office"}
                            control={methods.control}
                            defaultValue={props.defaultValues.office}
                            render={({field:{onChange, value}})=>(
                                        <FormControlLabel onChange={onChange}
                                                          value={value}
                                                          control={<Checkbox checked={value} />}
                                                          label="Офис"/>
                                )}
                />
                <Controller name={"outsource"}
                            control={methods.control}
                            defaultValue={props.defaultValues.outsource}
                            render={({field:{onChange, value}})=>(
                                    <FormControlLabel onChange={onChange}
                                                      value={value}
                                                      control={<Checkbox checked={value} />} label="Удаленно"/>
                            )}
                />
            </Grid>
            <Grid item md={2}>
                <Controller name={"address"}

                            control={methods.control}
                            defaultValue={props.defaultValues.address}
                            render={({field : { onChange, value}})=>(

                            <TextField
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                       value={value}
                                       fullWidth
                                       id="outlined-basic"
                                       label="Местоположение офиса"
                                        variant="filled"
                                        disabled = {!methods.control._formValues.office}
                            />

                            )}
                />
            </Grid>
            <Grid item md={6}></Grid>
            </> : null }
        </>
    );
}


export default Location;
