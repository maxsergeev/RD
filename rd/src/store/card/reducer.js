import {cardActionTypes} from "./action";
import {registryActionTypes} from "../registry/action";

const initialState = {
    getCard : null,
    createCard: null,
    updateCard: null,
    archiveCard: null,
    unarchiveCard: null,
    listCard: null,
    author: null,
    checkRequired: false,
    modal : {
        openModal: false, //стейт на модалку со ссылкой
        typeModal: null
    },

}

export const cardReducer = (state = initialState, action) => {
    let updateCard;
    let searchCard;
    switch (action.type) {
        case cardActionTypes.GET_AUTHOR:
            return { ...state, author: action.payload}
        case cardActionTypes.GET_CARD:
            return { ...state, getCard : action.payload}
        case cardActionTypes.CREATE_CARD:
            return { ...state, createCard: action.payload}
        case cardActionTypes.UPDATE_LIST:
            return { ...state,  listCard: action.payload}
        case cardActionTypes.UPDATE_ARCHIVE_CARD:
            updateCard = action.payload;
            searchCard = state.listCard.find(({id}) => id === updateCard.id);
            searchCard.cardStatus = updateCard.cardStatus;
            return { ...state, listCard: [...state.listCard]}
        case cardActionTypes.GET_LIST_CARD:
            return {...state, listCard: action.payload}
        case cardActionTypes.DELETE_CARD:
            return {...state, listCard : state.listCard.filter(({id}) => id !== action.payload)}
        case cardActionTypes.SET_DATE_START:
            return{...state, getCard: {...state.getCard, peopleLaunchDate: action.payload}}
        case cardActionTypes.SET_DATE_END:
            return{...state, getCard: {...state.getCard, completionDate: action.payload}}
        //МОДАЛКИ
        case cardActionTypes.SET_TYPE_MODAL:
            return {...state, modal: {...state.modal, typeModal: action.payload}}
        case cardActionTypes.OPEN_MODAL:
            return{...state, modal: {...state.modal, openModal: action.payload }}
        case cardActionTypes.CHECK_REQUIRED:
            return{...state, checkRequired: action.payload}
        default :
            return state;

    }
}