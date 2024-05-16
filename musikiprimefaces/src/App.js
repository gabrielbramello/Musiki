import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Artist from './pages/Artist/Artist';
import Album from './pages/Album/Album';
import Track from './pages/Track/Track';
import UserPage from './pages/UserPage/UserPage';
import Configuration from './pages/Config/Configuration';
import LoginPage from './pages/Login/Login';
import TrackNovo from './pages/Track/TrackNovo';

export default function App() {

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="/track/:trackId" element={<Track />} />
          <Route path="/track2/:trackId" element={<TrackNovo />} />
          <Route path="/paginadousuario" element={<UserPage />} />
          <Route path="/configuracoes" element={<Configuration />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ BrowserRouter>

  )
}
