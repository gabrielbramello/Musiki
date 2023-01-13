import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import SearchBar from './components/menu/SearchBar';
import "./App.css";

export default function Album() {

  var artistsExternalUrls
  var artistsName
  var externalUrls
  var images
  var name
  var releaseDate

  return (
<div>
  <div>
      <Menu></Menu>
    </div>
    <div className="App">
      <SearchBar placeholder="Digite o nome de um album..." source={'/spotify/search/album/'}></SearchBar>
    </div>
</div>
  )
}
