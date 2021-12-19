import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid,  Paper, Typography} from "@mui/material";
import {Link, useLocation, useParams} from "react-router-dom";
import {card__getCard} from "../../store/card/thunk";
import {cardAction} from "../../store/card";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {rootUrl} from "../../js/constants";
import ModalMain from "../Modal/ModalMain";


const CardInfo = () => {
    const location = useLocation();
    const locate = location.pathname.toLowerCase();
    const dispatch = useDispatch();
    const {idCard} = useParams();
    const card = useSelector(state => state.card.getCard);

    const titleStyle = {
        fontWeight : 600,
    }
    // возвращаем данные карточки во все поля карточки
    useEffect(() => {
        const callDispatch = async () => {
            dispatch(await card__getCard(idCard));
        }
        callDispatch();
    }, [])
    /*--- MODAL ACTION---*/
    const modalOpen = () => {
        dispatch(cardAction.openModal(true))
    };

    // возвращаем данные карточки во все поля карточки
    useEffect(() => {
        if(locate.includes('/card/info')){
           console.log(card);
        }
    },[])

    return (
        <>
            <ModalMain/>
            <Grid container item md={12} spacing={2}>
                <Grid item md={8}></Grid>
                <Grid item md={2}>
                        <Button fullWidth
                                sx={{mr: '8px'}}
                                component={Link}
                                to={`/cards/${idCard}`}
                                style={{textDecoration : "none"}}
                                variant="contained">
                            Редактировать
                        </Button>
                </Grid>
                <Grid item md={2}>
                    <CopyToClipboard text={rootUrl + `/card/info/${idCard}`}>
                    <Button
                        fullWidth
                        sx={{mr: '8px'}}
                        variant="contained"
                        onClick={ () => {
                            // navigator.clipboard.writeText(rootUrl);
                            dispatch(cardAction.setTypeModal('share'));
                            modalOpen();
                        }}
                    >
                        Поделиться
                    </Button>
                    </CopyToClipboard>
                </Grid>

            </Grid>
        <Paper elevation={10}>
            <Grid sx={{marginBottom: '120px', py: '64px', px:'72px'}} container spacing={2}>
                {/*ПРОЕКТ И ЗАКАЗЧИК*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography variant="h4" component="h2" style={titleStyle}>Проект и заказчик</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography variant="h5" component="div">Название проекта : "{card?.projectName}"</Typography>
                        <Typography variant="h5" component="div">Название клиента : {card?.projClientName}</Typography>
                    </Grid>
                </Grid>
                <Grid  container item md={6} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h4" component="h2" style={titleStyle}>Тип проекта</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h5" component="div">Модель : {card?.projectModelType}</Typography>
                        <Typography variant="h5" component="div">ПО или ПАК : {card?.softwareComplex}</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h5" component="div">MVP : {(card?.mvp === true) ? 'Да' : 'Нет'}</Typography>
                        <Typography variant="h5" component="div">Система: {card?.systemType}</Typography>
                    </Grid>
                </Grid>
                <Grid container item md={1}></Grid>
                {/*CТАДИЯ ПРОЕКТА*/}
                <Grid container item md={5} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h4" component="h2" style={titleStyle}>Стадия проекта</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography  variant="h5" component="h2">{card?.projectStage}</Typography>
                    </Grid>
                </Grid>
                {/*ПРОЦЕДУРА ВЫВОДА ЛЮДЕЙ НА ПРОЕКТ*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography variant="h4" component="h2" style={titleStyle}>Процедура вывода людей на проект</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography  variant="h5" component="h2">Кому направлять резюме : {card?.whomSend}</Typography>

                        <Typography  variant="h5" component="h2">Сколько собеседований предполагается : {card?.manyInterview}</Typography>

                        <Typography  variant="h5" component="h2">С кем : {card?.withWhom}</Typography>

                    </Grid>
                </Grid>
                {/*ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h4" component="h2" style={titleStyle}>Дополнительная информация о проекте</Typography>
                    </Grid>

                    <Grid item md={6}>
                        <Typography  variant="h5" component="h2">Функциональное направлениe : {card?.functionalDirection}</Typography>
                        <Typography  variant="h5" component="h2">Предметная область : {card?.subjectArea}</Typography>
                        <Typography  variant="h5" component="h2">Описание проекта : {card?.projectDescription}</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography  variant="h5" component="h2">Задачи проекта : {card?.objectives}</Typography>
                        <Typography  variant="h5" component="h2">Техонолгии проекта : {card?.technologies}</Typography>
                        <Typography  variant="h5" component="h2">Стейкхолдеры проекта : {card?.stakeholders}</Typography>
                    </Grid>
                </Grid>
                {/*КОМАНДА*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography  variant="h4" component="h2" style={titleStyle}>Команда</Typography>
                    </Grid>
                        <Grid item md={3}>
                            <Typography  variant="h5" component="h2" >Методология разработки : {card?.devMethodology}</Typography>
                        </Grid>
                        <Grid item md={3}>
                            <Typography  variant="h5" component="h2" >Продуктовая разработка : {card?.productDevelopment === true ? 'Да' : 'Нет'}</Typography>
                        </Grid>
                        <Grid item md={3}>
                            <Typography  variant="h5" component="h2" >Тестировщики на проекте : {card?.testers === true ? 'Да' : 'Нет'}</Typography>
                        </Grid>
                        <Grid item md={3}>
                            <Typography  variant="h5" component="h2" >Техн. писатели на проекте : {card?.techWriters === true ? 'Да' : 'Нет'}</Typography>
                        </Grid>
                        {/*Описание команды*/}
                        <Grid  container item md={12} spacing={2}>
                            <Grid item md={12}>
                                <Typography sx={{ fontSize: '24px' }} variant="h6" component="p" style={titleStyle}> Описание команды:</Typography>
                            </Grid>
                            <Grid item md={4}>
                                <Typography  variant="h5" component="h2" >Аналитики : {(card?.hasAnalytics === true ? 'Да' : 'Нет')}</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography  variant="h5" component="h2" >Количество : {card?.analystsNum}</Typography>
                            </Grid>
                            <Grid item md={6}></Grid>
                            <Grid item md={4}>
                                <Typography  variant="h5" component="h2" >Разработчики : {(card?.hasDev === true ? 'Да' : 'Нет')}</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography  variant="h5" component="h2" >Количество : {card?.devsNum}</Typography>
                            </Grid>
                            <Grid item md={6}></Grid>
                            <Grid item md={4}>
                                <Typography  variant="h5" component="h2" >Сформирована ли команда : {card?.teamReady === true ? 'Да' : 'Нет'}</Typography>
                            </Grid>
                            <Grid item md={3}>
                                <Typography  variant="h5" component="h2" >Количество сотрудников : {card?.peopleInTeamNum}</Typography>
                            </Grid>
                            <Grid item md={5}></Grid>
                        </Grid>
                </Grid>
                {/*ЛОКАЦИЯ*/}
                <Grid container item md={12} spacing={2}>
                    <Grid item md={12}>
                        <Typography variant="h5" component="h2" style={titleStyle}> Локация </Typography>
                    </Grid>
                        <Grid item md={4}>
                            <Typography  variant="h5" component="h2" >Офис : {(card?.address !== null ? 'Да' : 'Нет')}</Typography>
                            <Typography  variant="h5" component="h2" >Удаленно : {(card?.outsource === true ? 'Да' : 'Нет')}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Typography  variant="h5" component="h2" >Местоположение офиса : {card?.address}</Typography>
                        </Grid>
                        <Grid item md={4}></Grid>
                </Grid>
                {/*ГРАФИК РАБОТЫ*/}
                <Grid container item md={12} spacing={2} >
                    <Grid container item md={12} spacing={2} >
                        <Grid  item md={12}>
                            <Typography variant="h5" component="h2" style={titleStyle}> График работы </Typography>
                        </Grid>
                    </Grid>
                        <Grid item md={12}>
                            <Typography  variant="h5" component="h2" >Начало рабочего дня : {card?.whpFrom}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography  variant="h5" component="h2" >Конец рабочего дня : {card?.whpTill}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography  variant="h5" component="h2" >Овертаймы: {card?.overtime}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography  variant="h5" component="h2" >Возможный график: {card?.scheduleDescription}</Typography>
                        </Grid>
                </Grid>
            </Grid>
        </Paper>
        </>
    )
}


export default CardInfo;
