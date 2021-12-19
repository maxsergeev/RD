//Cards
export const cardActionTypes = {
    GET_AUTHOR : 'CARD__GET_AUTHOR', //данные об авторе карточки
    GET_CARD : 'CARD__GET_CARD', //получение данных выбранной карточки
    GET_LIST_CARD: 'CARD__GET_LIST_CARD', // получения списка карточек в регистре
    CREATE_CARD: 'CARD__CREATE_CARD', //создание новой карточки
    CHECK_REQUIRED: 'CARD__CHECK_REQUIRED', //проверка на заполнение обязательных полей
    UPDATE_LIST: 'CARD__UPDATE_LIST', //обновление существующей
    UPDATE_ARCHIVE_CARD: 'CARD__UPDATE_ARCHIVE_CARD', //архивирование карточки
    UNARCHIVE_CARD: 'CARD__UNARCHIVE_CARD', //разархивирование карточки
    DELETE_CARD: 'CARD__DELETE_CARD', //удаление карточки
    OPEN_MODAL: 'CARD__OPEN_MODAL', //открыть модалку
    SET_DATE_START: 'CARD__SET_DATE_START', //дата начала проекта
    SET_DATE_END: 'CARD__SET_DATE_END', //дата окончания проекта
    SET_TYPE_MODAL:'CARD__SET_TYPE_MODAL',
}

export const cardAction = {
    getAuthor: (payload) => ({type: cardActionTypes.GET_AUTHOR, payload}),
    getCard : (payload) => ({type: cardActionTypes.GET_CARD, payload}),
    getListCard : (payload) => ({type : cardActionTypes.GET_LIST_CARD, payload}),
    deleteCard : (payload) => ({type: cardActionTypes.DELETE_CARD, payload}),
    createCard: (payload) => ({type: cardActionTypes.CREATE_CARD, payload}),
    checkRequired: (payload) => ({type: cardActionTypes.CHECK_REQUIRED, payload}),
    updateList: (payload) => ({type: cardActionTypes.UPDATE_LIST, payload }),
    updateArchiveCard : (payload) => ({type: cardActionTypes.UPDATE_ARCHIVE_CARD, payload}),
    setDateStart : (payload) => ({type: cardActionTypes.SET_DATE_START, payload}),
    setDateEnd : (payload) => ({type: cardActionTypes.SET_DATE_END, payload}),
    openModal : (payload) => ({type: cardActionTypes.OPEN_MODAL, payload}),
    setTypeModal : (payload) => ({type: cardActionTypes.SET_TYPE_MODAL, payload}),

}