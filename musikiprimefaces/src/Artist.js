import React, { useEffect, useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import "./App.css";
import axios from "./apis/api";
import { useParams } from 'react-router-dom';
import SimpleCard from './components/cards/SimpleCard';


function Artist() {

  const [data, setData] = useState({});
  const { artistId } = useParams();

  useEffect(() => {
    axios.get('/spotify/artist/' + artistId)
      .then(response => setData(response.data))
      .catch(error => console.log(error.message))
  }, [])

  function createLink(data, name) {
    return (
      <a href={data.externalUrls && data.externalUrls.externalUrls.spotify} target="_blank">{name}</a>
    )
  }

  console.log(data)

  return (
    <div>
      <Menu></Menu>
      <div className="AppAlbum">
        <div id="coverSettings">
          <img alt="alternatetext" src={data.images && data.images[1].url} ></img>
        </div>
        <div id="itemsSettings">
        <SimpleCard title="Nome do(a) Artista:"width="12rem" bottom="2em" content={data.name} isRating = {false}></SimpleCard>
        <SimpleCard title="Links:" width="12rem" bottom="2em" content={createLink(data, "Spotify")} isRating = {false}></SimpleCard>
        <SimpleCard title="Número de Seguidores:" width="12rem" bottom="2em" content={data.followers && data.followers.total} isRating = {false}></SimpleCard>
        <SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating = {true}></SimpleCard>
        <SimpleCard title="Generos:" width="12rem" bottom="2em" content={data.genres && data.genres[0]} isRating = {false}></SimpleCard>        </div>
      </div>
    </div>
  )
}

export default Artist
