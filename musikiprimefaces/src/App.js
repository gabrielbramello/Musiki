import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import SearchBar from './components/menu/SearchBar';
import "./App.css";
import { Link } from 'react-router-dom';

export default function App() {

  return (
<div>
  <div>
      <Menu></Menu>
    </div>
    <div className="App">
      <SearchBar placeholder="O que deseja descobrir hoje?"></SearchBar>
      {/*<p><Link to="/artistas">Mudar de Pagina</Link></p>*/}
    </div>
</div>
  )
}
