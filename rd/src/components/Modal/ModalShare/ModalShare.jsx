import React from 'react';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {cardAction} from "../../../store/card";
import {useDispatch, useSelector} from "react-redux";


const ModalShare = (props) => {
    const dispatch = useDispatch();
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
        <div>
            <Modal
                open={props.open}
                onClose={() => dispatch(cardAction.openModal(false))}
                aria-labelledby="parent-modal-title"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Ссылка скопирована!</h2>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalShare;
