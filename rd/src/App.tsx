import React, {useState} from 'react';
import './App.css';
import { Container } from '@mui/material';
import {Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import CardInfo from "./components/CardInfo/CardInfo";
import ListCard from "./components/ListCard/ListCard";
import Login from "./components/Login/Login";
import { ThemeProvider, createTheme } from '@mui/material/styles';



const theme = createTheme({
    palette: {
        success: {
            light: '#81c784',
            main: '#66bb6a',
            dark: '#388e3c',
            contrastText: '#fff',
        },
        info: {
            light: '#81c784',
            main: '#66bb6a',
            dark: '#388e3c',
            contrastText: '#fff',
        }
    },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
            <Header />
            <Container sx={{mt: '100px' }} maxWidth="xl">
                <Routes>
                    <Route path={`/create`} element={<Card new={true}/>}/>
                    <Route path={`/card/info/:idCard`} element={<CardInfo/>}/>
                    <Route path={`/cards/:idCard`} element={<Card new={false}/>}/>
                    <Route path="/" element={<ListCard/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Container>
      </ThemeProvider>
  );
}

export default App;
