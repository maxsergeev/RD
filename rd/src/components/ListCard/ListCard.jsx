import React, {useEffect, useState} from 'react';
import './ListCard.module.scss'
import {DataGrid, GridActionsCellItem, GridToolbar, ruRU} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CustomPagination} from "./Pagination/Pagination";
import ArchiveIcon from "@mui/icons-material/Archive";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import {CustomToolbar} from "./ToolBar/ToolBar";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from 'react-router-dom'
import {card__archiveCard, card__deleteCard, card__listCard, card__unarchiveCard} from "../../store/card/thunk";
import {defaultFilter, rootUrl} from "../../js/constants";
import {cardAction} from "../../store/card";
import ModalMain from "../Modal/ModalMain";
import {filter__setFilter} from "../../store/registry/thunk";
import {useDemoData} from "@mui/x-data-grid-generator";
import {registryAction} from "../../store/registry/action";
import {applyFilter} from "../../api";
import {CopyToClipboard} from "react-copy-to-clipboard";

const theme = createTheme(
    ruRU,
);
const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) =>
        createStyles({
            root: {
                border: 0,
                color:
                    theme.palette.mode === 'light'
                        ? 'rgba(0,0,0,.85)'
                        : 'rgba(255,255,255,0.85)',
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
                WebkitFontSmoothing: 'auto',
                letterSpacing: 'normal',
                '& .MuiDataGrid-columnsContainer': {
                    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
                },
                '& .MuiDataGrid-iconSeparator': {
                    display: 'none',
                },
                '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                    borderRight: `1px solid ${
                        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
                    }`,
                },
                '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                    borderBottom: `1px solid ${
                        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
                    }`,
                },
                '& .MuiDataGrid-cell': {
                    color:
                        theme.palette.mode === 'light'
                            ? 'rgba(0,0,0,.85)'
                            : 'rgba(255,255,255,0.65)',

                },
                '& .MuiPaginationItem-root': {
                    borderRadius: 4,
                },
                '& .MuiDataGrid-cell--textLeft.MuiDataGrid-cell--withRenderer, .css-1z4p5c-MuiDataGrid-root .MuiDataGrid-cell--textLeft.MuiDataGrid-cell--editing': {
                    justifyContent: 'center'
                },
                '& .MuiDataGrid-cell--textLeft': {
                    textAlign: 'center'
                },
                '& .MuiDataGrid-columnHeaderTitleContainer': {
                    justifyContent: 'center'
                },
                '& .MuiChip-root':{
                    borderRadius: 4,
                    width: 100
                }
            },
        }),
    { defaultTheme },
);

const renderChipStatus = (params) => {
    //данные регистра проекта из стора
    let status = new Object();
    switch (params) {
        case "Активна":
            return status = {
                statusName : 'Активна' ,
                chipColor : 'success'
            };
            break;
        case "Черновик":
            return status = {
                statusName : 'Черновик' ,
                chipColor : 'default'
            };
            break;
        case "Архив":
            return status = {
                statusName : 'Архив' ,
                chipColor : 'primary'
            };
            break;
    }
}



const ListCard = (props) => {
    const modalOpen = () => {
        dispatch(cardAction.openModal(true))
    };

    const columns = [
        { field: 'id', headerName: 'Номер', width: 100},
        { field: 'projectName',
            headerName: 'Наименование проекта',
            width: 200,
            renderCell: (params) =>  (
                <Link to={`/card/info/${params.row.id}`}>{params.value}</Link>
            )
        },
        { field: 'projClientName', headerName: 'Заказчик проекта', width: 160},

        { field: 'cardAuthor', headerName: 'Автор заявки', width: 160},

        {   field: 'cardStatus',
            headerName: 'Статус',
            width: 130,
            renderCell: (params) => {
                const colorChip = renderChipStatus(params.value);
            return(
                <Stack direction="row" spacing={1} alignItems="center">

                    <Chip
                        label={colorChip.statusName}
                          color={colorChip.chipColor}
                            size="small"
                    />
                </Stack>
            )

            },
        },
        { field: 'functionalDirection', headerName: 'Функциональное направление', width: 250},
        { field: 'subjectArea', headerName: 'Предметная область', width: 170},
        { field: 'projectStage', headerName: 'Стадия проекта', width: 140},
        {
            field: 'actions',
            type: 'actions',
            width: 155,
            renderCell: (params) => {
                return [
                    <GridActionsCellItem
                        component={Link}
                        to={`/cards/${params.row.id}`}
                        icon={<EditIcon sx={{textDecoration:'none', color: 'grey'}} />}
                        label="Edit"

                    />,
                    <GridActionsCellItem
                        icon={ params.row.cardStatus === 'Архив' ?
                            <ArchiveIcon color="primary"/>
                        : <ArchiveIcon color="success"/> }
                        label="Archive"
                        onClick = {() => {
                            if(params.row.cardStatus === 'Архив') {
                                dispatch(card__unarchiveCard(params.row.id, params.row.cardStatus))
                                dispatch(cardAction.setTypeModal('unarchive'));
                            }else{
                                dispatch(card__archiveCard(params.row.id, params.row.cardStatus))
                                dispatch(cardAction.setTypeModal('archive'));
                            }
                        }}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon  color="error"/>}
                        label="Delete"
                        onClick={() =>dispatch(card__deleteCard(params.row.id))}
                    />,
                    <CopyToClipboard text={rootUrl + `/card/info/${params.row.id}`}>
                    <GridActionsCellItem
                        icon={<ShareIcon  color="default"/>}
                        label="Share"
                        onClick={() => {
                            // let url = rootUrl + `card/info/${params.row.id}`;
                            // navigator.clipboard.writeText(url);
                            dispatch(cardAction.setTypeModal('share'));
                            modalOpen();
                        }}
                    />
                    </CopyToClipboard>
                ]
            }

        },

    ];

    const classes = useStyles();

    const listCard = useSelector(state => state?.card?.listCard)
    const countCard = useSelector(state => state?.registry?.pagination?.countCard)
    const filter = useSelector(state => state?.registry?.filterParams)
    const dispatch = useDispatch();

    const [sortModel, setSortModel] = React.useState([
        { field: 'id', sort: 'asc' },
    ]);


    useEffect(() => {
        const callDispatch = async () => {
            dispatch( await  card__listCard());
        }
        callDispatch();
    },[]);

    useEffect(() => {
        //при изменении стейта компоненты сетаем новые
        //значения сортировки в фильтр и отправляем в санку
        const sortDispatch = async () => {
            dispatch ( await filter__setFilter(
                {...filter,
                    field: sortModel[0]?.field,
                    sort: sortModel[0]?.sort }))
        }
        sortDispatch();
    },[sortModel])

    // получаем массив с объектом, внутри которого новые параметры сортировки
    const handleSortModelChange = (newModel) => {
        if(newModel.length !== 0){
            setSortModel([newModel[0]])
        }else{
            setSortModel([])
        }
    };

    return (
        <div>
            <ModalMain/>
            <Grid sx={{marginBottom: '120px'}} container spacing={2}>
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <ThemeProvider theme={theme}>
                            <div style={{ height: 700, width: '100%' }}>
                                <DataGrid
                                        paginationMode='server'
                                        sortingMode='server'
                                        onSortModelChange={handleSortModelChange}
                                        className={classes.root}
                                        rows={listCard}
                                        sortModel={sortModel}
                                        rowCount={countCard}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[5]}
                                        components={{
                                            Pagination: CustomPagination,
                                            Toolbar: CustomToolbar,
                                        }}
                                />
                            </div>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}



export default ListCard;
