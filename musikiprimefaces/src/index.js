import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Artist from './Artist';
import Album from './Album';
import UserPage from './UserPage';
import Configuration from './Configuration';
import Music from './Music';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<App />} />
        <Route path="/artist/:artistId" element={<Artist />}/>
        <Route path="/album" element={<Album />} />
        <Route path="/track" element={<Music />} />
        <Route path="/paginadousuario" element={<UserPage />} />
        <Route path="/configuracoes" element={<Configuration />} />
      </Routes>
    </ BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
