import React from 'react';
import {Grid, TextField, Typography} from "@mui/material";
import SelectInput  from "../../SelectInput/SelectInput";
import {Controller, useFormContext} from "react-hook-form";

const DescTeam = (props) => {
    const methods = useFormContext();
    return (
        <>
            <Grid item md={12}>
                <Typography sx={{ fontSize: '16px' }}
                            variant="h6"
                            component="p">
                    Описание команды:
                </Typography>
            </Grid>
            <Grid item md={4}>
                    <SelectInput
                        value="Аналитики"
                        stage={props.dataSelect.bool}
                        name="hasAnalytics"
                    />
            </Grid>
            <Grid item md={2}>

                <Controller name={"analystsNum"}
                            control={methods.control}
                            defaultValue={props.defaultValues.analystsNum}
                            render={({field : { onChange, value}})=>(
                            <TextField
                                variant="filled"
                                id="outlined-basic"
                                label="Количество"
                                type="number"
                                value={value}
                                onChange={onChange}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                fullWidth
                                disabled = {!methods.control._formValues.hasAnalytics}
                            />
                            )}
                />

            </Grid>
            <Grid item md={6}></Grid>
            <Grid item md={4}>
                    <SelectInput
                        value="Разработчики"
                        stage={props.dataSelect.bool}
                        name="hasDev"
                    />

            </Grid>
            <Grid item md={2}>
                <Controller name={"devsNum"}
                            control={methods.control}
                            defaultValue={props.defaultValues.devsNum}
                            render={({field : { onChange, value}})=>(
                            <TextField fullWidth
                                       variant="filled"
                                       id="outlined-basic"
                                       label="Количество"
                                       type="number"
                                       value={value}
                                       onChange={onChange}
                                       InputLabelProps={{ shrink: true }}
                                       inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                       disabled={!methods.control._formValues.hasDev}
                            />

                            )}
                />
            </Grid>
            <Grid item md={6}></Grid>
            <Grid item md={4}>
                <SelectInput
                    value="Сформирована ли команда"
                    stage={props.dataSelect.bool}
                    name="teamReady"
                />
            </Grid>
            <Grid item md={2}>
                <Controller name={"peopleInTeamNum"}
                            control={methods.control}
                            defaultValue={props.defaultValues.peopleInTeamNum}
                            render={({field : { onChange, value}})=>(
                                <TextField fullWidth
                                           variant="filled"
                                           id="outlined-basic"
                                           label="Количество сотрудников"
                                           type="number"
                                           value={value}
                                           onChange={onChange}
                                           InputLabelProps={{ shrink: true }}
                                           inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
                            )}
                />
            </Grid>
            <Grid item md={6}></Grid>
        </>
    );
}


export default DescTeam;
