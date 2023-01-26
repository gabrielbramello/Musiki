import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "../../App.css";
import "/node_modules/primeflex/primeflex.css"
import axios from "../../apis/api";
import Header from '../../components/menu/Header';
import SimpleCard from '../../components/cards/SimpleCard';

function Artist() {

  const [data, setData] = useState({});
  const { artistId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set the loading flag to true
    setIsLoading(true);

    // Use the axios.get() method to make a GET request to the API endpoint
    axios.get('/spotify/artist/' + artistId)
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
      <a href={data.externalUrls && data.externalUrls.externalUrls.spotify} target="_blank">{name}</a>
    )
  }

  function capitalizeEachWord(sentence) {
		return sentence.split(' ')
		  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		  .join(' ');
	  }

  console.log(data)

  return (
    <div>
      <Header></Header>
      <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center',  flexWrap: 'wrap' }}>
        <div>
          <img alt="alternatetext" src={data.images && data.images[1].url} ></img>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection:'row', justifyContent:'space-around', flexWrap: 'wrap' }}>
          <SimpleCard title="Nome do(a) Artista:" width="12rem" bottom="2em" content={data.name} isRating={false}></SimpleCard>
          <SimpleCard title="Links do(a) Artista:" width="12rem" bottom="2em" content={createLink(data, "Spotify")} isRating={false}></SimpleCard>
          <SimpleCard title="Número de Seguidores:" width="12rem" bottom="2em" content={data.followers.total} isRating={false}></SimpleCard>
          <SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
          <SimpleCard title="Gêneros Musicais:" width="12rem" bottom="2em" content={capitalizeEachWord(data.genres[0])} isRating={false}></SimpleCard>
        </div>
      </div>
    </div>
  )
}

export default Artist
