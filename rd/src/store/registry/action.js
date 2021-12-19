import {cardActionTypes} from "../card";

export const registryActionTypes = {
    APPLY_FILTER: 'REGISTRY__APPLY_FILTER', //отправка запроса с установленными параметрами фильтра
    GET_COUNT_CARD: 'REGISTRY__GET_COUNT_CARD', //получаем общее количество карточек
}

export const registryAction = {
    getCountCard : (payload) => ({type: registryActionTypes.GET_COUNT_CARD, payload}),
    applyFilter: (payload) => ({type: registryActionTypes.APPLY_FILTER, payload}),
}