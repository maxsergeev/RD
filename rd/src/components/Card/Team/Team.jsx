import React from 'react';
import {Grid, TextField, Autocomplete, Stack, Typography, IconButton,} from "@mui/material";
import SelectInput  from "../SelectInput/SelectInput";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DescTeam from "./DescTeam/DescTeam";


const Team = (props) => {
    const [showOptions, setShowOptions] = React.useState(false)
    const hideOptions = () =>  setShowOptions(!showOptions)
    return (
        <>
                    <Grid item md={12}>
                        <Typography  variant="h5" component="h2">Команда
                            <IconButton aria-label="arrow-down" onClick={hideOptions}>
                                {showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                            </IconButton>
                        </Typography>
                    </Grid>
                    {showOptions ? <>
                        <Grid item md={3}>
                            <SelectInput
                                value="Методология разработки"
                                stage={props.dataSelect.devMethod}
                                name="devMethodology"
                            />

                        </Grid>
                        <Grid item md={3}>
                                <SelectInput
                                    value="Продуктовая разработка"
                                    stage={props.dataSelect.bool}
                                    name="productDevelopment"/>
                        </Grid>
                        <Grid item md={3}>
                                <SelectInput
                                    value="Тестировщики на проекте"
                                    stage={props.dataSelect.bool}
                                    name="testers"
                                />
                        </Grid>
                        <Grid item md={3}>
                            <SelectInput
                                value="Техн. писатели на проекте"
                                stage={props.dataSelect.bool}
                                name="techWriters"
                            />
                    </Grid>
                        {/*Описание команды*/}
                        <Grid  container item md={12} spacing={2}>
                            <DescTeam dataSelect={props.dataSelect} defaultValues={props.defaultValues} default/>
                        </Grid>
                    </> : null }

        </>
    );
}

export default Team;
