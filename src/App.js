import React from 'react';
import './App.css';
import image from './try this.jpg'
import twitter_image from './twitter.png'
import facebook_image from './facebook.png'
import instagram_image from './instagram.jpg'
import CardList from './CardList';
import LoginPage from './routes/LoginPage'
import {Routes, Route} from "react-router-dom"
import HomePage from './HomePage'
import CreatePage from './routes/CreatePage'

function App(){
  return (
    <Routes>
        <Route index element={<HomePage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='create' element={<CreatePage/>}/>
    </Routes>
  )
}

export default App;