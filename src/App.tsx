import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import storage from './service/storage';
import { setLoggedInfo } from './modules/user';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo');
    if (!loggedInfo) return;
    dispatch(setLoggedInfo(loggedInfo));
  };

  useEffect(() => {
    initializeUserInfo();
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
