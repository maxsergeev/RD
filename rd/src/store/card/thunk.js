import '../../api'
import {
    archiveCard,
    createProjectCard,
    deleteCard,
    getAuthorCard,
    getCard, getCountCard,
    getListCard,
    unarchiveCard,
    updateCard
} from "../../api";
import {cardAction} from "./action";
import {registryAction as cardRegistry} from "../registry/action";
import {defaultFilter} from "../../js/constants";


//Санка на получения инфы о текущем пользователе
export const card__getAuthor = () => async (dispatch, state) => {
    try{
        const author = await getAuthorCard();
        console.log('AUTHOR', author);
        dispatch(cardAction.getAuthor(author));
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}

//Санка на полученние данных карточки при переходе на неё
export const card__getCard = (id) => async (dispatch, state) => {
    try{
        const card = await getCard(id);
        console.log('PARSE CARD FROM SERVER',card);
        dispatch(cardAction.getCard(card));
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}

//Санка на обновление данных карточки по кнопке Сохранить
export const card__updateCard = (data) => async (dispatch, state) => {
    try{
        console.log(data);
        const card = await updateCard(data);
        // dispatch(cardAction.updateCard(data));
    }
    catch (e) {
        console.log("Ошибка при запросе", e)
    }
}

//Санка на создание новой  карточки
export const card__createCard = (data) => async (dispatch, state) => {
    try{
        console.log('CREATE DATA' , data);
        const card = await createProjectCard(data);
        // const newCard = 3;
        console.log(card);
        dispatch(cardAction.createCard(card));
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}

//Санка на получение списка карточек в регистре проектов / + количество карточек
export const card__listCard = () => async (dispatch, state) => {
    try{
        const list = await getListCard(defaultFilter);
        const count = await getCountCard(defaultFilter);
        dispatch(cardAction.getListCard(list));
        dispatch(cardRegistry.getCountCard(count));
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}

//Санка на удаление карточки
export const card__deleteCard = (id) => async (dispatch, state) => {
    try{
        await deleteCard(id);
        dispatch(cardAction.deleteCard(id))
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}

//Cанка архивирования карточки
export const card__archiveCard = (id) => async (dispatch, state) => {
    try{
        const card = await archiveCard(id)
        console.log('ARCHIVE CARD', )
        dispatch(cardAction.updateArchiveCard(card))
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}

export const card__unarchiveCard = (id) => async (dispatch, state) => {
    try{
        const card = await unarchiveCard(id)
        dispatch(cardAction.updateArchiveCard(card))
    }
    catch (e) {
        console.error("Ошибка при запросе", e)
    }
}