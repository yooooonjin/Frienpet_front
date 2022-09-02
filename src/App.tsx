import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './page/main/main';
import HomelessPage from './page/homeless_page/homeless_page';
import Header from './component/header/header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/homeless' element={<HomelessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
