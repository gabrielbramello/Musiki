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
import { Link } from 'react-router-dom';
import GradientCircleChart from '../../components/GradientCircleChart';
import ApexChart from '../../components/ApexChart';
import DataTableFilter from '../../components/dataTable/dataTableFilter';


export default function TrackNovo() {

  const [data, setData] = useState({});
  const { trackId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [audioFeatures, setAudioFeatures] = useState({});

  useEffect(() => {
    // Set the loading flag to true
    setIsLoading(true);

    // Use the axios.get() method to make a GET request to the API endpoint
    axios.get('/spotify/track/' + trackId)
      .then(response => {
        // Update the data and loading flag state
        setData(response.data);
        setIsLoading(false);
        console.log(response.data)
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
        // Set the loading flag to false
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {

    // Use the axios.get() method to make a GET request to the API endpoint
    axios.get('/spotify/track/audiofeatures/' + trackId)
      .then(response => {
        // Update the data and loading flag state
        //setAudioFeatures(response.data)
        console.log(response.data)
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
        // Set the loading flag to false
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {

    // Use the axios.get() method to make a GET request to the API endpoint
    axios.get('/spotify/track/audioanalyses/' + trackId)
      .then(response => {
        // Update the data and loading flag state
        console.log(response.data)
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
        // Set the loading flag to false
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {

    // Use the axios.get() method to make a GET request to the API endpoint
    axios.get('/samm/track/audiofeatures/' + trackId)
      .then(response => {
        // Update the data and loading flag state
        setAudioFeatures(response.data);
        console.log(response.data)
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

  /*function capitalizeEachWord(sentence) {
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
  }*/

  function returnEnergyFeature(value) {
    const arrayValue = []
    const energyValue = value * 100
    arrayValue.push(energyValue)
    return arrayValue
  }

  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'center', }}>

        <div style={{ width: '80vw' }}>
          <div id='info' style={{ display: 'flex', justifyContent: 'flex-start', margin: '25px' }}>

            <div id='imagem'>
              <img alt="Sem foto Disponível" src={((data.album && data.album.images[1]) && data.album.images[1].url) ?? ''} ></img>
            </div>

            <div id='infos'>

              <div id='titulos'>
                <h1 style={{ marginLeft: '40px' }}>{data.name} </h1>
                <h2 style={{ marginLeft: '40px' }}>{data.artists[0].name} </h2>
              </div>

              <div id='detalhes' style={{ display: 'flex' }}>

                <SimpleCard title="Duração da Faixa:" width="12rem" bottom="2em" content={convertMilliseconds(data.durationMs)} isRating={false}></SimpleCard>

                <SimpleCard
                  title="Nome do Album:"
                  width="12rem"
                  bottom="2em"
                  content={
                    <Link to={`/album/${data.album.id}`}>
                      {data.album.name}
                    </Link>
                  } />

                <SimpleCard title="Links:" width="12rem" bottom="2em" content={createLink(data, "Spotify")} isRating={false}></SimpleCard>

                <SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
              </div>

            </div>


          </div>

          <div id='features' style={{ display: 'flex' }}>

            <div id='features1' style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart series={[audioFeatures.energy]} label={['Energia']} />
                <GradientCircleChart series={[audioFeatures.acousticness]} label={['Acústica']} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart series={[audioFeatures.danceability]} label={['Dançabilidade']} />
                <GradientCircleChart series={[audioFeatures.instrumentalness]} label={['Instrumental']} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart series={[audioFeatures.liveness]} label={['Ao vivo']} />
                <GradientCircleChart series={[75]} label={['Ruído']} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart series={[audioFeatures.speechiness]} label={['Falada']} />
                <GradientCircleChart series={[audioFeatures.valence]} label={['Valência']} />
              </div>
            </div>

            <div id='features2' style={{ flex: 2 }}>
              <ApexChart
                categories={['Energia', 'Acústica', 'Dançabilidade', 'Instrumental', 'Ao vivo', 'Ruído', 'Falada', 'Valência']}
                values={[
                  audioFeatures.energy,
                  audioFeatures.acousticness,
                  audioFeatures.danceability,
                  audioFeatures.instrumentalness,
                  audioFeatures.liveness,
                  75,
                  audioFeatures.speechiness, 
                  audioFeatures.valence
                ]
                }
              />
            </div>


          </div>

          <div id='recomendations'>
            <DataTableFilter />
          </div>

        </div>
      </div>



    </div>
  )
}
