import axios from "axios";
import {parserAuthor, parserCard, parserRegistry} from "../js/parser";
import {url} from "../js/constants";


//получение данных об авторе карточки
export const getAuthorCard = () => (
    axios.get(url + '/api/users/auth')
        // axios.get('http://99f9-176-116-143-139.ngrok.io/api/cards/registry')
        .then(response => {
            const data = response.data;
            console.log('AUTHOR DATA',data);
            console.log('AUTHOR PARSE DATA',parserAuthor(data));
            return parserAuthor(data);
        })
)

//создание новой карточки
//post /api/cards/new       ----createProjectCard
export const createProjectCard = (data) => (
    axios.post(url + `/api/cards/new`, data)
        .then(response => {

            const data = response.data;
            return data;
        })
)

//данные получаемой карточки
//get   /api/cards/{id}     -----getProjectCardById
export const getCard = (id) => (
    axios.get(url + `/api/cards/${id}`)
        .then(response => {
            const data = response.data;
            console.log('BACK-END CARD' , data);
            return parserCard(data);
        })
    )

//сохранение существующей карточки
//put   /api/cards/{id}    -------updateCard
export const updateCard = (data) => {
    console.log('API', data);
    axios.put(url + `/api/cards/${data.id}`, data)
        .then(response => {
            console.log(response, 'updateCard');
        })
}

//архивирование существующей карточки
//put  /api/cards/archive/{id}   -----archiveCard
export const archiveCard = (id) => (
    axios.put(url + `/api/cards/archive/${id}`)
        .then(response => {
            const data = response.data.info;
            console.log('archiveCard', data);
            return data;
        })
)

//удаление карточки из архива
//delete  /api/cards/archive/{id}    ------unarchiveCard
export const unarchiveCard = (id) => (
    axios.delete(url + `/api/cards/archive/${id}`)
        .then(response => {
            const data = response.data.info;
            console.log('unarchiveCard', data);
            return data;
        })
)

//полное удаление карточки
//delete  /api/cards/{id}   -----deleteCard
export const deleteCard = (id) => {
    axios.delete(url + `/api/cards/${id}`)
        .then(response => {
            console.log(response, 'deleteCard');
        })
}



//регистр - получение списка проектов
//get   /api/cards/registry   ------getRegistryPage
export const getListCard = (filter) => (
    axios.get(url + '/api/cards/registry', {params : filter})
    // axios.get('http://99f9-176-116-143-139.ngrok.io/api/cards/registry')
        .then(response => {
            const data = response.data;
            return parserRegistry(data);
        })
)

// получение общего количества карточек
export const getCountCard = (filter) => (
    axios.get(url + '/api/cards/total', {params : filter})
        .then(response => {
            const data = response.data.projectsNum;
            // console.log('API COUNT CARD', data)
            return data;
        })
)

/////////////////////////////////////////////////////
///////////////----ФИЛЬТРАЦИЯ, ПАГИНАЦИЯ, СОРТИРОВКА----////////////////////
/////////////////////////////////////////////////////
export const applyFilter = (filter) => (
    axios.get(url + `/api/cards/registry`, {params : filter})
        .then(response => {
            const data = response.data;
            // console.log(data);
            return parserRegistry(data);
        })
)
