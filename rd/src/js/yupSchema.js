import * as yup from "yup";

export const schema = yup.object().shape({
    projectName: yup
        .string()
        .required(), //название
    projClientName: yup.string()
        .required(),//заказчик
    projectModelType: yup.string()
        .required(), //модель
    softwareComplex: yup.string()
        .required(), //ПО ПАК
    mvp: yup.string()
        .required(), //MVP
    systemType: yup.string()
        .required(), //Система
    projectDescription: yup.string()
        .required(), //Описание проекта
    gost: yup.string()
        .required(),
    projectStage: yup.string()
        .required(),
});