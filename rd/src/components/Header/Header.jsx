import React from 'react';
import './Header.module.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink, useParams} from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation } from 'react-router-dom';
import logo from '../../img/logo300.png'
import style from './Header.module.scss'

const Header = () => {
    const location = useLocation();
    const locate = location.pathname.toLowerCase();
    const isCurrentURL = (url) => {
        return location.pathname.toLowerCase() === url.toLowerCase();
    }

    const namePage = (locate) => {
        switch (true) {
            case locate.includes('/cards') :
                return 'Редактирование карточки проекта';
            case locate.includes('/create'):
                return 'Новая карточка проекта'
            case locate.includes('/login') :
                return  'Авторизация' ;
            case locate.includes('/card/info') :
                return  'Описание проекта' ;
            default:
                return 'Реестр проектов';
        }
    }

    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar>
                    <Toolbar>
                        <Box sx={{marginRight:'48px'}}>
                            <img src={logo} alt="logo" className={style.logo}/>
                        </Box>

                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            {namePage(locate)}
                        </Typography>

                        { locate.includes('/cards') || locate.includes('/create') || locate.includes('/card/info')?
                            <>
                                <Button as={NavLink}
                                        exact
                                        to={`/`}
                                        color="inherit"
                                        style={{textDecoration : "none", textAlign: "center", }}>
                                    Вернуться в реестр
                                </Button>

                            </>
                            : null }
                        { !isCurrentURL(`/login`) ?
                        <Button as={NavLink}
                                color="inherit"
                                to={'/login'}
                                style={{textDecoration : "none", textAlign: "center", }}
                        >
                            Выход
                        </Button>
                            : null }
                    </Toolbar>
                </AppBar>
            </Box>

    );
}

export default Header;
