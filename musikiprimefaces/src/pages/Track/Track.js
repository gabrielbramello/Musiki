import React, { useEffect, useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "../../App.css";
import Header from '../../components/menu/Header';
import axios from "../../apis/api";
import { useParams } from 'react-router-dom';
import SimpleCard from '../../components/cards/SimpleCard';
import "/node_modules/primeflex/primeflex.css"

export default function Track() {

  const [data, setData] = useState({});
  const { trackId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set the loading flag to true
    setIsLoading(true);

    // Use the axios.get() method to make a GET request to the API endpoint
    axios.get('/spotify/track/' + trackId)
      .then(response => {
        // Update the data and loading flag state
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
        // Set the loading flag to false
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Api do Spotify Carregando...</p>;
  }

  function createLink(data, name) {
    return (
      <a href={data.externalUrls.externalUrls.spotify ?? ''} target="_blank">{name}</a>
    )
  }

  function convertMilliseconds(data) {
    var minutes = Math.floor(data / 60000);
    var seconds = ((data % 60000) / 1000).toFixed(0);
    return "" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function capitalizeEachWord(sentence) {
    if (sentence && typeof sentence === 'string' && sentence.trim) {
      if (!sentence.trim()) {
        return sentence;
      }

      return sentence.split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    } else {
      return sentence;
    }
  }

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <img alt="Sem foto Disponível" src={((data.album && data.album.images[1]) && data.album.images[1].url) ?? ''} ></img>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <SimpleCard title="Nome da Faixa:" width="12rem" bottom="2em" content={data.name} isRating={false}></SimpleCard>
          <SimpleCard title="Nome do(a) Artista:" width="12rem" bottom="2em" content={((data.artists && data.artists[0]) && data.artists[0].name) ?? 'Não Classificado'} isRating={false}></SimpleCard>
          <SimpleCard title="Duração da Faixa:" width="12rem" bottom="2em" content={convertMilliseconds(data.durationMs)} isRating={false}></SimpleCard>
          <SimpleCard title="Nome do Album:" width="12rem" bottom="2em" content={capitalizeEachWord(data.album.name)} isRating={false}></SimpleCard>
          <SimpleCard title="Links:" width="12rem" bottom="2em" content={createLink(data, "Spotify")} isRating={false}></SimpleCard>
          <SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
        </div>
      </div>
    </div>
  )
}
