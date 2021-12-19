import React, {useEffect, useState} from 'react';
import {useGridApiContext, useGridState} from "@mui/x-data-grid";
import makeStyles from "@mui/styles/makeStyles";
import Pagination from "@mui/material/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {registryAction} from "../../../store/registry/action";
import {filter__setFilter} from "../../../store/registry/thunk";
import {getCountPage} from "../../../js/functions";

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
});

export function CustomPagination() {
    const apiRef = useGridApiContext();
    const [state] = useGridState(apiRef);
    const classes = useStyles();
    const dispatch = useDispatch()
    const filter = useSelector(state => state?.registry?.filterParams)
    const countCard = useSelector(state => state?.registry?.pagination?.cardCount)
    const countPage = getCountPage(countCard);
    //меняем полученный из стейта фильтр
    const setPage = (value) => {
        filter.page = value;
        dispatch(filter__setFilter(filter))
    }
    return (
        <Pagination
            className={classes.root}
            color="primary"
            count={countPage}
            page={filter.page}
            onChange={(event, value) => {
                setPage(value);
                console.log(value);
            }}
        />
    );
}