import React, {useEffect, useState} from 'react';
import {AccountCircle} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import {Grid} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import ButtonGroup from "@mui/material/ButtonGroup";
import {Link, NavLink} from "react-router-dom";
import {dataSelect, defaultFilter} from "../../../js/constants";
import {useDispatch, useSelector} from "react-redux";
import {registryAction} from "../../../store/registry/action";
import debounce from "@mui/material/utils/debounce";
import {filter__setFilter} from "../../../store/registry/thunk";
import {randomStr} from "../../../js/functions";
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {applyFilter} from "../../../api";

export const CustomToolbar = () => {
    const dispatch = useDispatch();
    const [filterState, setFilterState] = useState({
        projName: null,
        projClient : null,
        cardAuthor : null,
        cardStatus : null,
        field : 'id',
        sort : 'asc',
        page : 1,
    })

    const [str, setStr] = useState('');

    const applyFilter = (filter) => {
        setFilterState({...filterState, projName: null, projClient : null, cardAuthor : null, cardStatus : null, }) // сброс стейта фильтра
        filter.page = 1;
        dispatch(filter__setFilter(filter))
    }

    return (

    <Grid sx={{mb: '24px'}} container spacing={2}>
        <Grid container item md={10} spacing={2}>
            <Grid item md={3}>
                <TextField
                    id="outlined-textarea"
                    label="Фильтр по имени проекта"
                    size="small"
                    fullWidth
                    key={str}
                    onChange={(event) => setFilterState( {...filterState, projName: event?.target?.value} )}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ArticleIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item md={2}>
                <TextField
                    id="outlined-textarea"
                    label="Фильтр по заказчику"
                    size="small"
                    fullWidth
                    key={str}
                    onChange={(event) => setFilterState( {...filterState, projClient: event?.target?.value})}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item md={2}>
                <TextField
                    id="outlined-textarea"
                    label="Фильтр по автору"
                    size="small"
                    fullWidth
                    key={str}
                    onChange={(event) => setFilterState( {...filterState, cardAuthor: event?.target?.value} )}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AssignmentIndIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item md={2}>
                <FormControl fullWidth >
                    <TextField select size='small'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Фильтр по статусу"
                        key={str}
                        onChange={(event) => setFilterState( {...filterState, cardStatus: event?.target?.value} )}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SpellcheckIcon/>
                                </InputAdornment>
                            ),
                        }}
                    >
                        {dataSelect.status.map((item,key) => (
                            <MenuItem key={key} value={item}>{item}</MenuItem>
                        ))}
                    </TextField>
                </FormControl>

            </Grid>
            <Grid item md={3} >
                <ButtonGroup sx={{height: '100%'}} fullWidth disableElevation color="success" variant="contained">
                    <Button variant="outlined"
                            color="success"
                            onClick={() => {
                                applyFilter(filterState)
                            }}>
                        Применить
                    </Button>
                    <Button variant="outlined"
                            color="error"
                            onClick={() => {
                                let random = randomStr();
                                setStr(random);
                                applyFilter(defaultFilter)
                            }}
                    >
                        Сбросить</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        <Grid container item md={2}>
            <Grid item md={12}>
                <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={'/create'}
                        style={{textDecoration : "none"}}
                >
                    Создать карточку
                </Button>
            </Grid>
        </Grid>
    </Grid>
    );
}