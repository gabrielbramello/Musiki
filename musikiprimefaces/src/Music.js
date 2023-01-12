import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import SearchBar from './components/menu/SearchBar';
import "./App.css";

export default function Music() {

  return (
<div>
  <div>
      <Menu></Menu>
    </div>
    <div className="App">
      <SearchBar placeholder="Digite o nome de uma musica..."></SearchBar>
    </div>
</div>
  )
}
