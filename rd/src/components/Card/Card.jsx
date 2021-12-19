import React, {useEffect, useState} from 'react';
//custom components
import WorkTime from "./WorkTime/WorkTime";
import Location from "./Location/Location";
import Team from "./Team/Team";
import SelectInput  from "./SelectInput/SelectInput";
//constants
import {dataSelect, defaultValues, rootUrl} from "../../js/constants";
//Material UI
import {Grid, TextField, Typography, FormControl, RadioGroup, FormControlLabel,
        Radio, Autocomplete, Stack, Button, Box, FormHelperText} from "@mui/material";
import {DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
//others
import {useForm, FormProvider, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../js/yupSchema";
import {serializeCard, serializeCreateCard} from "../../js/serializer";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    card__archiveCard,
    card__createCard,
    card__deleteCard,
    card__getAuthor,
    card__getCard, card__unarchiveCard,
    card__updateCard
} from "../../store/card/thunk";
import {cardAction} from "../../store/card";
import ModalMain from "../Modal/ModalMain";
import {CopyToClipboard} from "react-copy-to-clipboard";


const Card = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locate = location.pathname.toLowerCase();
    const {idCard} = useParams();
    const navigate = useNavigate();

    const styleArchiveButton = {
        "&.MuiButton-root": {
            background: "grey"
        },
        "&.MuiButton-text": {
            color: "grey"
        },
        "&.MuiButton-outlined": {
            color: "brown"
        }
    }
    const floatButton = { //стили для плавающего сабмита
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    //данные карточки проекта из стора
    const card = useSelector(state => state?.card?.getCard);
    const authorData = useSelector(state => state?.card?.author);

    const [date, setDate] = React.useState([null, null]);//стейт на рэндж пикер
    /*---REACT HOOK FORM METHODS---*/
    const methods = useForm({defaultValues, resolver:yupResolver(schema)});
    const { register,
            control,
            reset,
            handleSubmit,
            watch,
            setValue,
            getValues,
            formState: { errors }} = methods;
    watch(['hasDev','hasAnalytics','office','projectModelType']);

    /*--- SUBMIT THUNK FORM  ---*/
    const onChange = (data) => {
        console.log('DATA', data);
        // if(checkRequiredField(data)){
        //     console.log("ОБЯЗАТЕЛЬНЫЕ ПОЛЯ ЗАПОЛНЕНЫ")
        // }else{
        //     console.log("ЗАПОЛНИТЕ ОБЯЗАТЕЛЬНЫЕ ПОЛЯ!!!")
        // }
        if (props.new){ //если это карточка новая, то создаём её
            const cardObj = serializeCreateCard(data, authorData);
            console.log(cardObj);
            dispatch(card__createCard(cardObj));
            //устанавливаем тип модали и открываем её
            dispatch(cardAction.setTypeModal('create'));
            modalOpen();
        }else{
            const cardObj = serializeCard(data, authorData);
            console.log('UDATE SERIALIZE', cardObj);
            dispatch(card__updateCard(cardObj));
            //*************
            dispatch(cardAction.setTypeModal('update'));
            modalOpen();
        }
    };
    /*--- MODAL ACTION---*/
    const modalOpen = () => {
        dispatch(cardAction.openModal(true))
    };


    useEffect(() => {
        const callDispatch = async () => {
            //санка на получение данных об авторе
            dispatch(await card__getAuthor());
            //не запрашивать данные карточки, при создании новой

            if (props.new === false){
                dispatch(await card__getCard(idCard));
            }
        }
        callDispatch();
    },[idCard]);
    useEffect(() => {
        // возвращаем данные карточки во все поля карточки
        if(locate.includes('/cards') && props.new === false){
            reset(card);
        }
        if(idCard){
            setDate([card?.peopleLaunchDate,card?.completionDate])
        }else{
            setDate([null,null])
        }

    },[card])

    console.log('ID CARD',idCard);
    return (
        <div>
            <ModalMain/>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onChange)}>
            <Grid sx={{marginBottom: '120px'}} container spacing={2}>
                {/*ТУЛБАР КАРТОЧКИ*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        { (!idCard) ?
                            <Button
                                sx={{mr:'8px'}}
                                variant="contained"
                                color="success"
                                type="submit"
                            >Создать карточку<DoneIcon /></Button>
                         :
                            <Button
                                key={idCard}
                                sx={{mr:'8px'}}
                                variant="contained"
                                color="success"
                                type="submit"
                            >Cохранить карточку<DoneIcon /></Button>
                        }

                        { locate.includes('/cards') && (props.new === false) ?
                            <Button
                                sx={{mr:'8px'}}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    dispatch(card__archiveCard(idCard))
                                    dispatch(cardAction.setTypeModal('archive'));
                                    modalOpen();
                                }}>
                                Архивировать карточку<ArchiveIcon/>
                            </Button>
                         : null}

                        { locate.includes('/cards') && (props.new === false) ?
                            <Button
                                sx={{mr:'8px'}}
                                variant="contained"
                                color="error"
                                type="button"
                                onClick={() => {
                                    dispatch(card__deleteCard(idCard))
                                    navigate('/');
                                }}
                            >Удалить карточку<DeleteIcon /></Button>
                         : null}

                        { locate.includes('/cards') && (props.new === false) ?
                            <Button key={card?.archiveCard}
                                sx={{mr: '8px'}}
                                color="inherit"
                                onClick={() => {
                                    dispatch(card__unarchiveCard(idCard))
                                    dispatch(cardAction.setTypeModal('unarchive'));
                                    modalOpen();
                                }}
                            >Восстановить</Button>
                            : null}
                        { locate.includes('/cards') && (props.new === false) ?
                            <CopyToClipboard text={rootUrl + `/card/info/${idCard}`}>
                            <Button
                                sx={{mr: '8px'}}
                                color="inherit"
                                onClick={ () => {
                                    // navigator.clipboard.writeText(rootUrl);
                                    dispatch(cardAction.setTypeModal('share'));
                                    modalOpen();
                                }}
                            >Поделиться</Button>
                            </CopyToClipboard>
                         : null}
                        <Button
                            variant="contained"
                            color="secondary"
                            type="button"
                            sx={styleArchiveButton}
                            onClick={() => {
                                const data = getValues();
                                // console.log(data);
                                onChange(data);
                            }}
                        >Cохранить как черновик<DoneIcon /></Button>
                    </Grid>
                </Grid>
                {/*ПРОЕКТ И ЗАКАЗЧИК*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography variant="h5" component="h2">Проект и заказчик</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Controller name={"projectName"}
                                    control={control}
                                    defaultValue={defaultValues.projectName}
                                    render={({field : { onChange, value}})=>(
                                        <TextField
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            inputRef={{...register}}
                                            sx={{ mb:'8px',mt:'8px'}}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="outlined-error-helper-text"
                                            label={"Название проекта *"}
                                            error={!!errors.projectName}
                                            helperText={!!errors.projectName ? "Введите название проекта" : null}
                                        />

                                    )}/>

                        <Controller name={"projClientName"}
                                    control={control}
                                    defaultValue={defaultValues.projClientName}
                                    render={({field : {onChange, value}})=>(
                                        <TextField
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            inputRef={{...register}}
                                            sx={{ mb:'8px',mt:'8px'}}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="outlined-basic"
                                            label={"Заказчик проекта *"}
                                            error={!!errors.projClientName}
                                            helperText={!!errors.projectName ? "Введите название заказчика" : null}
                                        />

                                    )}/>
                    </Grid>
                </Grid>
                {/*ТИП ПРОЕКТА*/}
                <Grid  container item md={6} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h5" component="h2">Тип проекта</Typography>
                    </Grid>
                    <Grid item md={6}>

                        <SelectInput err={!!errors.projectModelType} name="projectModelType" mb='16px' value="Модель" requie={true} stage={dataSelect.model} />

                        <SelectInput err={!!errors.softwareComplex} name="softwareComplex" value="ПО или ПАК" requie={true} stage={dataSelect.po} />
                    </Grid>
                    <Grid item md={6}>

                        <SelectInput err={!!errors.mvp} name="mvp" mb='16px' value="MVP" requie={true} stage={dataSelect.bool} />

                        <SelectInput err={!!errors.systemType} name="systemType" value="Система" requie={true} stage={dataSelect.system} />
                    </Grid>
                </Grid>
                <Grid container item md={1}></Grid>
                {/*CТАДИЯ ПРОЕКТА*/}
                <Grid container item md={5} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h5" component="h2">Стадия проекта *</Typography>
                    </Grid>
                    <Grid item md={12}>
                    <FormControl component="fieldset">
                            <Controller name={"projectStage"}
                                        control={control}
                                        defaultValue={defaultValues.projectStage}
                                        render={({field : {onChange, value}})=>(
                                            <RadioGroup
                                                aria-label="stage-project"
                                                name="radio-buttons-group"
                                                onChange={onChange}
                                                value={value}
                                                error={!!errors.projectStage}
                                            >
                                                {
                                                    dataSelect.stage.map((item,key) => (
                                                        <FormControlLabel
                                                            key={key}
                                                            value={item}
                                                            control={<Radio/>}
                                                            label={item} />


                                                    ))
                                                }
                                            </RadioGroup>

                                        )}

                            />
                        {
                            errors.projectStage ?
                                <FormHelperText error={true}>Выберете стадию проекта</FormHelperText>
                                :
                                null
                        }
                        </FormControl>
                    </Grid>
                </Grid>
                {/*ПРОЦЕДУРА ВЫВОДА ЛЮДЕЙ НА ПРОЕКТ*/}
                {/*если модель TM, то добавляем этот блок */}
                { methods.control._formValues.projectModelType === "T&M" ? <>
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography variant="h5" component="h2">Процедура вывода людей на проект</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Controller name={"whomSend"}
                                    control={control}
                                    defaultValue={defaultValues.whomSend}
                                    render={({field : { onChange, value}})=>(
                                        <TextField
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Кому направлять резюме"
                                            margin="dense" />
                                    )}
                        />

                        <Controller name={"manyInterview"}
                                    control={control}
                                    defaultValue=""
                                    render={({field : { onChange, value}})=>(
                                        <TextField
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="outlined-basic"
                                            label="Сколько собеседований предполагается"
                                            type="number"
                                            margin="dense" />
                                    )}
                        />

                        <Controller name={"withWhom"}
                                    control={control}
                                    defaultValue=""
                                    render={({field : { onChange, value}})=>(
                                        <TextField
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="outlined-basic"
                                            label="С кем"
                                            margin="dense" />
                                    )}
                        />
                    </Grid>
                </Grid>
                </>
                    : null }
                {/*ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h5" component="h2">Дополнительная информация о проекте</Typography>
                    </Grid>

                    <Grid item md={6}>

                        <SelectInput mb='4px' mt='8px' name="functionalDirection" value="Функциональное направлениe" stage={dataSelect.functionalDirection} />

                        <Controller name={"subjectArea"}
                                    control={control}
                                    defaultValue={defaultValues.subjectArea}
                                    render={({field : { onChange, value}})=>(
                                        <TextField
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                                   fullWidth
                                                   onChange={onChange}
                                                   value={value}
                                                   multiline="true"
                                                   minRows="1"
                                                   maxRows="10"
                                                   id="outlined-basic"
                                                   label="Предметная область"
                                                   margin="dense" />
                                        )}
                        />

                        <Controller name={"projectDescription"}
                                    control={control}
                                    defaultValue={defaultValues.projectDescription}
                                    render={({field : { onChange, value}})=>(
                                    <TextField
                                        variant="filled"
                                        InputLabelProps={{ shrink: true }}
                                        inputRef={{...register}}
                                               fullWidth
                                               onChange={onChange}
                                               value={value}
                                               multiline="true"
                                               minRows="1"
                                               maxRows="10"
                                               id="outlined-basic"
                                               label="Описание проекта *"
                                               error={!!errors.projectDescription}
                                               margin="dense"
                                               helperText={!!errors.projectDescription ? "Заполните описание проекта" : null}
                                    />
                                    )}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Controller name={"objectives"}
                                    control={control}
                                    defaultValue={defaultValues.objectives}
                                    render={({field : { onChange, value}})=>(
                                        <TextField variant="filled"
                                                   InputLabelProps={{ shrink: true }}
                                                   fullWidth
                                                   onChange={onChange}
                                                   value={value}
                                                   multiline="true"
                                                   minRows="1"
                                                   maxRows="10"
                                                   id="outlined-basic"
                                                   label="Задачи проекта"
                                                   margin="dense" />
                                        )}
                        />
                        <Stack fullWidth sx={{marginTop:'8px', marginBottom:'4px'}}>
                            <Controller
                                key = {card?.technologies}
                                name={"technologies"}
                                        control={control}
                                        render={()=>(
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            InputLabelProps={{ shrink: true }}
                                            defaultValue={props.new === false ? card?.technologies : defaultValues.technologies}
                                            options={dataSelect.technologies}
                                            onChange={(e, options) => setValue('technologies', options)}
                                            renderInput={(params) => (
                                                <TextField
                                                    variant="filled"
                                                    {...params}
                                                    InputLabelProps={{ shrink: true }}
                                                    label="Техонолгии проекта"
                                                />
                                            )}
                                        />
                                    )}
                            />
                        </Stack>

                        <Controller name={"stakeholders"}
                                    control={control}
                                    defaultValue={defaultValues.stakeholders}
                                    render={({field : { onChange, value}})=>(
                                        <TextField variant="filled"
                                                   InputLabelProps={{ shrink: true }}
                                                   fullWidth
                                                   onChange={onChange}
                                                   value={value}
                                                   multiline="true"
                                                   minRows="1"
                                                   maxRows="10"
                                                   id="outlined-basic"
                                                   label="Стейкхолдеры проекта"
                                                   margin="dense" />
                                    )}
                        />

                    </Grid>
                </Grid>
                {/*КОМАНДА*/}
                <Grid container item md={12} spacing={2}>
                    <Team dataSelect={dataSelect} defaultValues={defaultValues}/>
                </Grid>
                {/*ЛОКАЦИЯ*/}
                <Grid container item md={12} spacing={2}>
                    <Location dataSelect={dataSelect} defaultValues={defaultValues}/>
                </Grid>
                {/*ГРАФИК РАБОТЫ*/}
                <Grid container item md={12} spacing={2} >

                    <WorkTime dataSelect={dataSelect} defaultValues={defaultValues}/>
                </Grid>
                {/*ДАТА ВЫВОДА ЛЮДЕЙ НА ПРОЕКТ*/}
                <Grid sx={{marginTop:'40px'}}  container item md={12} spacing={2}>
                    <Grid item md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                startText="Дата вывода людей на проект"
                                endText="Срок завершения проекта"
                                value={date}
                                onChange={(newDate) => {
                                    setDate(newDate);
                                    setValue('peopleLaunchDate', newDate[0]);
                                    setValue('completionDate', newDate[1]);
                                }}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField InputLabelProps={{ shrink: true }}  variant="filled" fullWidth {...startProps} label="Дата вывода людей на проект"/>
                                        <Box sx={{ mx: 1 }}></Box>
                                        <TextField InputLabelProps={{ shrink: true }} variant="filled" fullWidth {...endProps} label="Срок завершения проекта"/>
                                    </React.Fragment>
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={2}>
                        <SelectInput
                            err={!!errors.gost}
                            // requie={dataSelect.require}
                            value="Док-е проекта по ГОСТ *"
                            stage={dataSelect.bool}
                            name="gost"
                        />
                    </Grid>
                </Grid>
                <Button type="submit" style={floatButton} size="large" variant="contained" color="success"><DoneIcon/></Button>
            </Grid>
            </form>
            </FormProvider>
        </div>
    );
}




export default Card;
