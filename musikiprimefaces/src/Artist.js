import React, { useEffect, useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import "./App.css";
import axios from "./apis/api";
import { useParams } from 'react-router-dom';
import SimpleCard from './components/cards/SimpleCard';
import "/node_modules/primeflex/primeflex.css"

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
      <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center',  flexWrap: 'wrap' }}>
        <div>
          <img alt="alternatetext" src={data.images && data.images[1].url} ></img>
        </div>
        <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', flexWrap: 'wrap' }}>
          <SimpleCard title="Nome do(a) Artista:" width="12rem" bottom="2em" content={data.name} isRating={false}></SimpleCard>
          <SimpleCard title="Links:" width="12rem" bottom="2em" content={createLink(data, "Spotify")} isRating={false}></SimpleCard>
          <SimpleCard title="Número de Seguidores:" width="12rem" bottom="2em" content={data.followers && data.followers.total} isRating={false}></SimpleCard>
          <SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
          <SimpleCard title="Generos:" width="12rem" bottom="2em" content={data.genres && data.genres[0]} isRating={false}></SimpleCard>
        </div>
      </div>
    </div>
  )
}

export default Artist
