import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {LockOutlined} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const Login = () => {
    const paperStyle = {
        padding: 20,
        height: 350,
        width: 280,
        margin: '0 auto'
    }
    const avatarStyle = {
        background: '#1976d2'
    }
return (

    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid container md={12} align='center' >
                <Grid container md={12}>
                    <Grid item md={12} sx={{mb:'8px'}}>
                        <Avatar style={avatarStyle}> <LockOutlined/></Avatar>
                    </Grid >
                    <Grid item md={12} sx={{mb:'32px'}}>
                        <Typography variant="h5" component="h2">Авторизация</Typography>
                    </Grid>
                    <Grid item md={12} sx={{mb:'8px'}}>
                        <TextField label='Имя пользователя' size='small' fullWidth></TextField>
                    </Grid>
                    <Grid item md={12} sx={{mb:'8px'}}>
                        <TextField label='Пароль' size='small' fullWidth></TextField>
                    </Grid>
                </Grid>
            </Grid>
            <FormControlLabel
                sx={{mb:'40px'}}
                control={<Checkbox />}
                label="Запомнить меня"
            />
            <Button type='submit'
                    color='primary'
                    variant='contained'
                    component={Link}
                    to={'/'}
                    fullWidth>Войти в систему</Button>
        </Paper>
    </Grid>
    );
}

export default Login;
