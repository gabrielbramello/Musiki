import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                           //icons
import "./App.css";
import Menu from './components/menu/Menu';
import axios from ".//apis/api";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Album = () => {

  const [data, setData] = useState({});
  const { albumId } = useParams();

  useEffect(() => {
    axios.get('/spotify/album/' + albumId)
      .then(response => setData(response.data))
      .catch(error => console.log(error.message))
  }, [])

  console.log(data)

  return (
    <div>
      <Menu></Menu>
      <div className="AppAlbum">
        <div id="coverSettings">
          <img src={data.images && data.images[1].url} alt="alternatetext"></img>
        </div>
        <div id="itemsSettings">
          <ul>
            <li>
              <h3>Artista:</h3>{data.artists && data.artists[0].name}
            </li>
            <li>
              <h3>Nome do Album:</h3>{data.name}
            </li>
            <li>
              <h3>Numero de Faixas:</h3>{data.tracks && data.tracks.total}
            </li>
            <li>
              <h3>Gravadora:</h3>{data.label}
            </li>
            <li>
              <h4>Popularidade:</h4>{data.popularity}
            </li>
            <li>
              <h4>Data de Lançamento:</h4>{data.releaseDate}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Album;