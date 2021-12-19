import React from 'react';
import {useSelector} from "react-redux";
import ModalCreate from "./ModalCreate/ModalCreate";
import ModalShare from "./ModalShare/ModalShare";

const ModalMain = () => {
    const modal = useSelector(state => state?.card?.modal);
    const createCard = useSelector(state => state?.card?.createCard)
    switch (modal.typeModal) {
        case 'share' :
            return (
                <ModalShare open={modal.openModal}/>
            )
        case 'create' :
            return (
                <ModalCreate
                    textInfo="Карточка создана успешно!"
                    url={`/cards/${createCard}`}
                    open={modal.openModal}
                />
            )
        case 'update' :
            return (
                <ModalCreate
                    textInfo="Карточка обновлена успешно!"
                    url={""}
                    open={modal.openModal}
                />
            )
        case 'archive':
            return (
                <ModalCreate
                    textInfo="Карточка отправлена в архив!"
                    url={""}
                    open={modal.openModal}
                />
            )
        case 'unarchive':
            return (
                <ModalCreate
                    textInfo="Карточка удалена из архива!"
                    url={""}
                    open={modal.openModal}
                />
            )
        default:
            return <ModalShare open={modal.openModal}/>
    }


}



export default ModalMain;
