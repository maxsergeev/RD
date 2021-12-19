import {format} from 'date-fns'

const checkRequiredField = (field) => {
    const required = (field === "" || null ? null : field )
    return required
}


//Cериализация данных на "Сохранение карточки"
export const serializeCard = (data, authorData) => { //author
    console.log('SERIALIZER', data)

    let completionDate = new Date(data?.completionDate);
    let peopleLaunchDate = new Date(data?.peopleLaunchDate);
    completionDate = format(completionDate, 'yyyy-MM-dd');
    peopleLaunchDate = format(peopleLaunchDate, 'yyyy-MM-dd');

    const projectName = checkRequiredField(data?.projectName)
    const projClientName = checkRequiredField(data?.projClientName)
    const projectDescription = checkRequiredField(data?.projectDescription)


    return {
        "cardAuthor": {
            "id": authorData?.cardAuthor?.id,
            "surname": authorData?.cardAuthor?.surname,
            "name": authorData?.cardAuthor?.name,
            "patronymic": authorData?.cardAuthor?.patronymic,
        },
        "id": data?.id,
        "projectName": projectName,
        "projClientName": projClientName,
        "projectStage": data?.projectStage,
        "functionalDirection": data?.functionalDirection,
        "subjectArea": data?.subjectArea,
        "projectDescription": projectDescription,
        "objectives": data?.objectives,
        "technologies": data?.technologies,
        "stakeholders": data?.stakeholders,
        "completionDate": completionDate,
        "peopleLaunchDate": peopleLaunchDate,
        "gost": data?.gost,
        "cardStatus": data?.cardStatus,
        projectType: {
            "id": data?.projectTypeID,
            "softwareComplex" : data?.softwareComplex,
            "mvp" : data?.mvp,
            "systemType" : data?.systemType,
            "projectModel":{
                "id": data?.projectModelID,
                "projectModelType": data?.projectModelType,
                "interviewerName" : data?.withWhom,
                "cvTo" : data?.whomSend,
                "numOfInterviews": data?.manyInterview,
            }
        },
        location : {
            "address" : data?.address,
            "office": data?.office,
            "outsource": data?.outsource,
        },
        team: {
            "id": data?.teamID,
            "devMethodology" : data?.devMethodology,
            "productDevelopment" : data?.productDevelopment,
            "testers" : data?.testers,
            "techWriters" : data?.techWriters,
            "analystsNum" : data?.analystsNum,
            "devsNum" : data?.devsNum,
            "teamReady" : data?.teamReady,
            "peopleInTeamNum" : data?.peopleInTeamNum,
            "hasAnalysts": data?.hasAnalysts,
            "hasDevs": data?.hasDevs,
        },
        workingHoursPattern: {
            "id": data?.workingHoursPatternID,
            "whpFrom": (data?.whpFrom !== null ? data?.whpFrom + ":00"  : null) ,
            "whpTill": (data?.whpTill !== null ? data?.whpTill + ":00"  : null) ,
            "overtime": data?.overtime,
            "possibleWorkSchedule": {
                "id": data?.possibleWorkScheduleID,
                "flextime": data?.flextime,
                "scheduleDescription": data?.scheduleDescription,
            }
        },
    }
}

//Cериализация данных на "Создать карточку"
export const serializeCreateCard = (data, authorData) => {
    let completionDate = format(new Date(data.completionDate), 'yyyy-MM-dd');
    let peopleLaunchDate = format(new Date(data.peopleLaunchDate), 'yyyy-MM-dd');
    return{
        "projectName": data.projectName,
        "projClientName": data.projClientName,
        "projectStage": data.projectStage,
        "functionalDirection": data.functionalDirection, //массив или строка ???
        "subjectArea": data.subjectArea, //массив или строка ???
        "projectDescription": data.projectDescription,
        "objectives": data.objectives,
        "technologies": data.technologies,
        "stakeholders": data.stakeholders,
        "peopleLaunchDate": peopleLaunchDate,
        "completionDate": completionDate, //объект был без поля ДАТА ЗАВЕРШЕНИЯ ПРОЕКТА
        "gost": data.gost,
        "cardStatus": data.cardStatus,
        "projectType": {
            "softwareComplex": data.softwareComplex,
            "mvp": data.mvp,
            "systemType": data.systemType,
            "projectModel": {
                "projectModelType": data.projectModelType,
                "interviewerName": data.withWhom,
                "numOfInterviews": data.manyInterview,
                "cvTo": data.whomSend,
            }
        },
        "team": {
            "devMethodology": data.devMethodology,
            "productDevelopment": data.productDevelopment,
            "testers": data.testers,
            "techWriters": data.techWriters,
            "analystsNum": data.analystsNum,
            "devsNum": data.devsNum,
            "teamReady": data.teamReady,
            "peopleInTeamNum": data.peopleInTeamNum,
        },
        "location": {
            "address": data.address,
            "office": data.office,
            "outsource": data.outsource
        },
        "workingHoursPattern": {
            "whpFrom": (data?.whpFrom !== null ? data?.whpFrom + ':00' : null) ,
            "whpTill": (data?.whpTill !== null ? data?.whpTill + ':00' : null) ,
            "overtime": data.overtime,
            "possibleWorkSchedule": {
                "flextime": data.flextime,
                "scheduleDescription": data.scheduleDescription
            }
        },
        "cardAuthor": {
            "id": authorData.cardAuthor.id,
            "surname": authorData.cardAuthor.surname,
            "name": authorData.cardAuthor.name,
            "patronymic": authorData.cardAuthor.patronymic,
        },
    }
}

//Cериализация данных регистра в исходный в формат для отправки
//НЕ БУДЕТ ИСПОЛЬЗОВАТЬСЯ...
// export const serializeRegistry = (data) => {
//     let serializeRegisrtyJson = [];
//     data.map((object, key) => {
//         serializeRegisrtyJson[key] = {
//             info: {
//                 projectName: data.projectName,
//                 projClientName: data.projClientName,
//                 cardAuthor: "Иван Петрович Сидоров",
//                 cardStatus: data.cardStatus,
//                 functionalDirection: data.functionalDirection,
//                 subjectArea: data.subjectArea,
//                 projectStage: data.projectStage,
//             },
//             url: data.url
//         }
//     })
//     return serializeRegisrtyJson;
// }
