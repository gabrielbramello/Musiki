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
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { jwtDecode } from 'jwt-decode';
import { decodeToken } from '../../utils/Utils';
import { Panel } from 'primereact/panel';
import { TabPanel, TabView } from 'primereact/tabview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons';


export default function TrackNovo() {

  const [data, setData] = useState({});
  const { trackId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [audioFeatures, setAudioFeatures] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState();
  const [favoriteTrack, setFavoriteTrack] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const keys = [
    { name: 'C', code: 0 },
    { name: 'C#/Db', code: 1 },
    { name: 'D', code: 2 },
    { name: 'D#/Eb', code: 3 },
    { name: 'E', code: 4 },
    { name: 'F', code: 5 },
    { name: 'F#', code: 6 },
    { name: 'G', code: 7 },
    { name: 'G#', code: 8 },
    { name: 'A', code: 9 },
    { name: 'A#', code: 10 },
    { name: 'B', code: 11 },
];

  const [tracks, setTracks] = useState([])

  //Lógicas inicias para verificar se o usuário está logado
  useEffect(() => {
    setIsLoading(true);

    setIsLoggedIn(false);
    if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
      setIsLoggedIn(true);
      const decodedToken = decodeToken(localStorage.getItem('authToken'));
      const userId = decodedToken.sub
      setUserId(userId);

      axios.get('/samm/user/favorites/tracks/' + userId)
        .then(response => {
          //setAudioFeatures(response.data)
          console.log(response.data)
          const favoriteTracks = response.data.favoritesTracks;

          const favoriteTrack = favoriteTracks.find(track => track.spotifyApiId == trackId)
          if (favoriteTrack) {
            setIsFavorite(true)
            setFavoriteTrack(favoriteTrack);
          }

        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    axios.get('/spotify/track/' + trackId)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('/spotify/track/audioanalyses/' + trackId)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {

    axios.get('/samm/track/audiofeatures/' + trackId)
      .then(response => {
        setAudioFeatures(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    recommendationsRequest();
  }, [])

  if (isLoading) {
    return <p>Api do Spotify Carregando...</p>;
  }

  function createLink(data, name) {
    console.log("teste")
    console.log(data)
    window.open(data.externalUrls.externalUrls.spotify, '_blank');

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


  function renderFavoriteButton(isFavorite) {
    if (isFavorite) {
      return (<Button className="favorite-button" onClick={() => handleFavoriteClickButton(false)} icon="pi pi-heart" size="large" rounded severity="help" aria-label="Favorite" data-pr-tooltip="Favorito" />)
    }
    return (<Button className="favorite-button" onClick={() => handleFavoriteClickButton(true)} icon="pi pi-heart" size="large" style={{ backgroundColor: '#ffffff' }} rounded text raised severity="help" aria-label="Favorite" data-pr-tooltip="Favorito" />)
  }

  function handleFavoriteClickButton(isFavorite) {

    const userFavoriteTrackRequest = {
      userId: userId,
      elementId: trackId
    }

    if (isFavorite) {
      axios.post('/samm/user/favorite/track', userFavoriteTrackRequest)
        .then(response => {
          console.log(response.data)
          const favoriteTracks = response.data.tracks;
          const favoriteTrack = favoriteTracks.find(track => track.spotifyApiId == trackId)
          if (favoriteTrack) {
            setIsFavorite(true)
            setFavoriteTrack(favoriteTrack);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios.delete('/samm/user/favorite/track/' + userId + '/' + favoriteTrack.id,)
        .then(response => {
          console.log(response.data)
          setIsFavorite(false)
        })
        .catch(error => {
          console.error(error);
        });
    }

  }

  function recommendationsRequest() {
    const recommendationsFilterDTO = {
      limit: 100,
      seedTracks: trackId
    }

    console.log(recommendationsFilterDTO)
    axios.post('/spotify/recommendations/', recommendationsFilterDTO)
      .then(response => {
        console.log(response.data)
        setTracks(response.data.tracks);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function returnKey(numKey){
    console.log(keys)
    console.log(numKey)
    const key = keys.find((key)=> numKey == key.code);
    console.log(key)
  }

  const featureDescription = {
    energy: 'Energia representa uma medida\n perceptiva de intensidade e atividade.\n\n Normalmente, as faixas energéticas\n parecem rápidas, altas e barulhentas.\n\n Por exemplo, o death metal tem alta energia, \nenquanto um prelúdio de Bach tem baixa.',
    instrumentalness: 'Prevê se uma faixa não contém vocais. Quanto mais próximo o valor da instrumentalidade estiver de 100, maior será a probabilidade de a faixa não conter conteúdo vocal.',
    liveness: 'Detecta a presença de público na gravação. Valores mais altos representam uma probabilidade maior de que a faixa tenha sido tocada ao vivo. Um valor acima de 80 oferece forte probabilidade de que a música esteja ao vivo.',
    loudness: 'O volume geral de uma faixa. Os valores variam entre 0 e 100.',
    speechiness: 'Detecta a presença de palavras faladas em uma faixa. Quanto mais exclusivamente falada for a gravação (por exemplo, talk show, audiolivro, poesia), mais próximo de 100 será o valor do atributo.',
    valence: 'Uma medida que descreve a positividade musical transmitida por uma faixa. Faixas com valência alta soam mais positivas (por exemplo, feliz, alegre, eufórica), enquanto faixas com valência baixa soam mais negativas (por exemplo, triste, deprimida, irritada).',
    acousticness:'Uma medida de 0 a 100 para saber se a faixa é acústica. 100 representa alta confiança de que a faixa é acústica.',
    danceability: 'Descreve o quão adequada uma faixa é para dançar. Um valor de 0 é menos dançante e 100 é mais dançante.'
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
              <img alt="Sem foto Disponível" style={{ minHeight: '320px', minWidth: '320px', margin: '30px' }} src={((data.album && data.album.images[1]) && data.album.images[1].url) ?? ''} ></img>
            </div>

            <div id='infos'>
              <div id='subinfo' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div id='titulos'>
                  <h1 style={{ marginLeft: '40px' }}>{data.name} </h1>
                  <h2 style={{ marginLeft: '40px' }}>{data.album.name} </h2>
                  <h3 style={{ marginLeft: '40px' }}>{data.artists[0].name} </h3>
                  <FontAwesomeIcon style={{ marginLeft: '40px', color: '#18d860', cursor: 'pointer' }} onClick={() => createLink(data, "Spotify")} size="2x" icon={faSpotify} />
                </div>
                <div id='favorito' style={{ margin: '40px' }}>
                  <Tooltip target=".favorite-button" />
                  {isLoggedIn ? renderFavoriteButton(isFavorite) : ''}

                </div>
              </div>


              <div id='detalhes' style={{ display: 'flex', justifyContent: 'space-between' }}>

                <SimpleCard title="Duração da Faixa" width="10rem" bottom="2em" content={convertMilliseconds(data.durationMs)} isRating={false}></SimpleCard>

                <SimpleCard title="BPM" width="10rem" content={audioFeatures.tempo} bottom="2em" />

                <SimpleCard title="Compasso" width="10rem" bottom="2em" content={audioFeatures.timeSignature} isRating={false}></SimpleCard>

                <SimpleCard title="Tonalidade" width="10rem" bottom="2em" content={audioFeatures.key}></SimpleCard>

                <SimpleCard title="Popularidade" width="10rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>

              </div>

            </div>


          </div>

          <div id='features' style={{ display: 'flex' }}>

            <div id='features1' style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart id={"energy"} toolTip={featureDescription.energy} tooltipPosition="left" series={[audioFeatures.energy]} label={['Energia']} />
                <GradientCircleChart id={"accoustic"} toolTip={featureDescription.acousticness} tooltipPosition="left" series={[audioFeatures.acousticness]} label={['Acústica']} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart id={"danceability"} toolTip={featureDescription.danceability} tooltipPosition="left" series={[audioFeatures.danceability]} label={['Dançabilidade']} />
                <GradientCircleChart id={"instrumentalness"} toolTip={featureDescription.instrumentalness} tooltipPosition="left" series={[audioFeatures.instrumentalness]} label={['Instrumental']} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart id={"liveness"} toolTip={featureDescription.liveness} tooltipPosition="left" series={[audioFeatures.liveness]} label={['Ao vivo']} />
                <GradientCircleChart id={"loudness"} toolTip={featureDescription.loudness} tooltipPosition="left" series={[audioFeatures.loudness]} label={['Ruído']} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GradientCircleChart id={"speechiness"} toolTip={featureDescription.speechiness} tooltipPosition="left" series={[audioFeatures.speechiness]} label={['Falada']} />
                <GradientCircleChart id={"valence"} toolTip={featureDescription.valence} tooltipPosition="left" series={[audioFeatures.valence]} label={['Valência']} />
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
                  audioFeatures.loudness,
                  audioFeatures.speechiness,
                  audioFeatures.valence
                ]
                }
              />
            </div>


          </div>

          <div id='recomendations'>
            <TabView style={{ borderRadius: '10px', marginBottom: '10px' }}>
              <TabPanel header="Recomendações" headerStyle={{ fontSize: '30px' }}>
                <DataTableFilter tracks={tracks} />
              </TabPanel>
            </TabView>
          </div>

        </div>
      </div>



    </div>
  )
}
