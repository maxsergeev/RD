import React from 'react';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {cardAction} from "../../../store/card";
import {useDispatch, useSelector} from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import Avatar from "@mui/material/Avatar";
import {LockOutlined} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Link, NavLink} from "react-router-dom";

const ModalCreate = (props) => {
    const dispatch = useDispatch();

    const avatarStyle = {
        background: '#1976d2',
        margin: '0 auto',
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        textAlign: 'center',
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
            <Modal
                open={props.open}
                // onClose={() => dispatch(cardAction.openModal(false))}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style, width: 450}}>

                    <Grid container spacing={2}>
                        <Grid container item md={12}>
                            <Grid item md={12}>
                                <Avatar style={avatarStyle}> <CheckCircleIcon/></Avatar>
                            </Grid>
                        </Grid>
                        <Grid container item md={12} sx={{mt:'16px'}}>
                            <Grid item md={12}>
                                <Typography variant="h5" component="h2">{props.textInfo}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item md={12} sx={{mt:'32px'}}>
                            <Grid item md={5}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    type="button"
                                    component={Link}
                                    exact
                                    to={props.url}
                                    onClick={() => {
                                        dispatch(cardAction.openModal(false))
                                    }}
                                >Редактировать</Button>
                            </Grid>
                            <Grid item md={2}></Grid>
                            <Grid item md={5}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    component={Link}
                                    exact
                                    to={`/`}
                                    style={{textDecoration : "none", textAlign: "center", }}
                                    onClick={() => {
                                        dispatch(cardAction.openModal(false))
                                    }}
                                >Вернуться в реестр</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

            </Modal>
    );
}

export default ModalCreate;
