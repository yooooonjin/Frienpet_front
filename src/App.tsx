import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './page/main/main';
import HomelessPage from './page/homeless_page/homeless_page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomelessPage />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
