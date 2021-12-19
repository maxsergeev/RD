import {registryActionTypes} from "./action";
import {act} from "react-dom/test-utils";
import {cardActionTypes} from "../card";

const initialState = {
    filterParams: {
        projClient : null,
        cardAuthor : null,
        cardStatus : null,
        projName: null,
        field : 'id',
        sort : 'asc',
        page : 1,
    },
    pagination : {
        page: null,
        cardCount: null,
    }
}

export const registryReducer = (state = initialState, action) => {
    switch (action.type) {
        case registryActionTypes.GET_COUNT_CARD:
            return {...state, pagination:{...state.pagination, cardCount: action.payload} };
        case registryActionTypes.APPLY_FILTER:
            return {...state, filterParams : action.payload};
       default:
            return state;
    }
}