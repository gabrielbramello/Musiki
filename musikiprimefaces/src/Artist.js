import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import "./App.css";
import api from ".//api/api";
import { useParams } from 'react-router-dom';


function Artist() {

  const [data, setData] = useState({});
  const params = useParams();
  const artistId = params.artistId;

  // var externalUrls
  // var totalFollowers
  // var genres
  // var images
  // var name
  // var popularity

  React.useEffect(() => {
    api.get('spotify/artist/' + artistId)
      .then(response => { console.log(response.data); return setData(response.data) })

  }, [])


  return (
    <div>
      <div>
        <Menu></Menu>
      </div>
      <div className="App">

        {data.images.map((image) => {
          console.log(image)
          return (
            <img src={image.url} alt="alternatetext"></img>
          )
        })}

        {data.genres.map((genre) => {
          return (
            <p>
              {genre}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Artist
