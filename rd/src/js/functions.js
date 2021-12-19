
//Проверка, является ли входящее значение эквивалентно булевому значению
//если да, то конвертирует его в булево
import {cardAction} from "../store/card";

export const checkBool = (item, lengthArray) => {
    if(lengthArray.length === 2){
        if (item === 'Да') {
            item = true
        }else if (item === 'Нет'){
            item = false
        }
    }
    return item
}

//генерим рандом строку
export const randomStr = () => {
    let abc = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    while (str.length < 6) {
        str += abc[Math.floor(Math.random() * abc.length)];
    }
    return str
}

//вычислями количество страниц для общего количества карточек
export const getCountPage = (countCard) => {
    return Math.ceil(countCard / 10)
}

// projectName: yup
//     .string()
//     .required(), //название
// projClientName: yup.string()
//     .required(),//заказчик
// projectModelType: yup.string()
//     .required(), //модель
// softwareComplex: yup.string()
//     .required(), //ПО ПАК
// mvp: yup.string()
//     .required(), //MVP
// systemType: yup.string()
//     .required(), //Система
// projectDescription: yup.string()
//     .required(), //Описание проекта
// gost: yup.string()
//     .required(),
// projectStage: yup.string()
//     .required(),