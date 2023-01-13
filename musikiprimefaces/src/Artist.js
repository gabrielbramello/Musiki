import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import "./App.css";
import api from ".//api/api";


 function Artist (id) {

  const [data, setData] = useState([]);

  var externalUrls
  var totalFollowers
  var genres
  var images
  var name
  var popularity

  api.get('spotify/artist/')
    .then(response => setData(response.data))

  externalUrls = this.data.externalUrls
  totalFollowers =  this.data.totalFollowers
  genres =  this.data.genres
  images =  this.data. images
  name =  this.data.name
  popularity = this.data.popularity

  return (
<div>
  <div>
      <Menu></Menu>
    </div>
    <div className="App">
    </div>
</div>
  )
}

export default Artist
