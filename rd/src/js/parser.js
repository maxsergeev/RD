import {format, parse} from 'date-fns'
import {SignalCellularNull} from "@mui/icons-material";

//функция парсинга регистра
export const parserRegistry = (data) => {
    let serializeRegisrtyJson = [];
    data.map((object, key) => {
            serializeRegisrtyJson.push(object.info);
            object.info.url = object.url;
    })
    return serializeRegisrtyJson;
}

//парсер автора
export const parserAuthor = (data) => {
    console.log('IN PARSER AUTHOR', data)
    return {
        cardAuthor: {
            id: data.id,
            surname: data.surname,
            name: data.name,
            patronymic: data.patronymic,
        }
    }
}

//парсер карточки
export const parserCard = (data) => {
    let hasDev = false;
    let hasAnalytics = false;
    console.log(data.completionDate);
    let completionDate = new Date (data.completionDate);
    let peopleLaunchDate = new Date (data.peopleLaunchDate);
    completionDate = format(completionDate, 'MM/dd/yyyy');
    peopleLaunchDate = format(peopleLaunchDate, 'MM/dd/yyyy');

    if ( data.team.analystsNum > 0){
        hasAnalytics = true;
    }
    if ( data.team.devsNum > 0){
        hasDev = true;
    }

    let whpFrom = data.workingHoursPattern.whpFrom
    let whpTill = data.workingHoursPattern.whpTill
    if(whpFrom !== null){
        whpFrom = whpFrom.slice(0, -3);
    }
    if(whpFrom !== null){
        whpTill = whpTill.slice(0, -3);
    }

    return {
        id : data.id,
        cardStatus: data.cardStatus,
        projectName: data.projectName,//имя проекта
        projClientName: data.projClientName, //имя заказчика проекта
        projectStage: data.projectStage,//стадия
        projectModelType: data.projectType.projectModel.projectModelType,//модель
        mvp: data.projectType.mvp,// MVP
        softwareComplex: data.projectType.softwareComplex,//ПО или ПАК
        systemType: data.projectType.systemType,//Система
        subjectArea: data.subjectArea,
        projectTypeID: data.projectType.id,
        projectModelID: data.projectType.projectModel.id,
        teamID: data.team.id,
        workingHoursPatternID: data.workingHoursPattern.id,
        possibleWorkScheduleID: data.workingHoursPattern.possibleWorkSchedule.id,
        whomSend: data.projectType.projectModel.cvTo, //кому направлять резюме
        manyInterview: data.projectType.projectModel.numOfInterviews, //сколько интервью
        withWhom: data.projectType.projectModel.interviewerName, //с кем
        projectDescription: data.projectDescription,//описание проекта
        objectives: data.objectives, //Задачи
        technologies: data.technologies, //технологии ***************
        stakeholders: data.stakeholders,
        functionalDirection: data.functionalDirection, //******************
        devMethodology: data.team.devMethodology,
        productDevelopment: data.team.productDevelopment,
        testers: data.team.testers,
        techWriters: data.team.techWriters,
        analystsNum: data.team.analystsNum,
        devsNum: data.team.devsNum,
        teamReady: data.team.teamReady,
        peopleInTeamNum: data.team.peopleInTeamNum,
        hasDev: hasDev,
        hasAnalytics: hasAnalytics,
        office: data.location.office,
        outsource: data.location.outsource,
        address: data.location.address,
        whpFrom: whpFrom,
        whpTill: whpTill,
        overtime: data.workingHoursPattern.overtime,
        completionDate: completionDate,
        peopleLaunchDate: peopleLaunchDate,
        gost: data.gost, //гост
        scheduleDescription: data.workingHoursPattern.possibleWorkSchedule.scheduleDescription,//возможный график
        flextime: data.workingHoursPattern.possibleWorkSchedule.flextime,
    }
}