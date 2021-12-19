// export const url = 'http://localhost:3007';
export const url = 'http://localhost:8080';
// export const url = 'http://4e96-176-116-136-236.ngrok.io';


export const rootUrl = window.location.host;

export const defaultFilter = {
    projClient : null,
    cardAuthor : null,
    cardStatus : null,
    projName: null,
    field : 'id',
    sort : 'asc',
    page : 1,
} ;

export const dataSelect = {
    bool: ['Нет','Да'],
    status: ['Активна', 'Черновик', 'Архив', null],
    statusEn: ['ACTIVE', 'DRAFT', 'ARCHIVE'],
    model: ['Фиксированная','T&M'],
    po: ['ПО','ПАК'],
    system: ['С нуля', 'Модернизация'],
    stage: ['Инициация','Начало','Завершающая','Середина'],
    overtimes: ['Иногда','Постоянно','Нет'],
    functionalDirection: ['Направление 1', 'Направление 2', 'Направление 3', 'Направление 4'],
    devMethod: ['Agile', 'Waterfall'],
    technologies: [
        'Java 8',
        'Java 11',
        'JavaScript',
        'TypeScript',
        'React',
        'Angular',
        'Spring Boot',
        'Hibernate',
        'Docker',
        'Kubernetes',
        'Postgresql',
        'Oracle Database',
        'Mysql',
        'Microsoft SQL Server',
        'Hadoop',
        'Cassandra',
        'MongoDB',
        'Gradle',
        'Maven',
        'C#',
        'React Native',
        'Vue',
        'JDBC',
        'Linux',
        'Git',
        'Kafka',
        'Redis',
        'RabbitMQ',
        'Liquibase',
        'Flyway',
        'Junit',
        'REST',
        'SOAP',
    ]
}
export const defaultValues = {
    projectTypeID: null,
    projectModelID: null,
    teamID: null,
    workingHoursPatternID: null,
    possibleWorkScheduleID: null,
    projectName: null,//имя проекта
    projClientName: null, //имя заказчика проекта
    projectStage: null,//стадия
    projectModelType: null,//модель
    mvp: null,// MVP
    softwareComplex: null,//ПО или ПАК
    systemType: null,//Система
    subjectArea: null,
    functionalDirection: null,
    whomSend: null, //кому направлять резюме
    manyInterview: null, //сколько интервью
    withWhom: null, //с кем
    projectDescription: null,//описание проекта
    objectives: null, //Задачи
    technologies: [], //технологии
    stakeholders: null,
    devMethodology: null,
    productDevelopment: null,
    testers: null,
    techWriters: null,
    analystsNum: null,
    devsNum: null,
    teamReady: null,
    peopleInTeamNum: null,
    hasDev: null,
    hasAnalytics: null,
    office: false,
    outsource: false,
    address: null,
    whpFrom: null,
    whpTill: null,
    overtime: null,
    completionDate: null,
    peopleLaunchDate: null,
    gost: null, //гост
    scheduleDescription: null//возможный график
}
