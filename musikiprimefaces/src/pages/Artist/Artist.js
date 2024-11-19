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
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton'; 
import { decodeToken } from '../../utils/Utils';

function Artist() {

  const [data, setData] = useState({});
  const { artistId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState();
  const [favoriteArtist, setFavoriteArtist] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  //Lógicas inicias para verificar se o usuário está logado
  useEffect(() => {
    setIsLoading(true);

    setIsLoggedIn(false);
    if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
      setIsLoggedIn(true);
      const decodedToken = decodeToken(localStorage.getItem('authToken'));
      const userId = decodedToken.sub
      setUserId(userId);

      axios.get('/samm/user/favorites/artists/' + userId)
        .then(response => {
          //setAudioFeatures(response.data)
          console.log(response.data)
          const favoriteArtists = response.data.favoritesArtists;

          const favoriteArtist = favoriteArtists.find(artist => artist.spotifyApiId == artistId)
          if (favoriteArtist) {
            setIsFavorite(true)
            setFavoriteArtist(favoriteArtist);
          }

        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {

    setIsLoading(true);

    axios.get('/spotify/artist/' + artistId)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="border-round border-1 surface-border p-4 surface-card">
        <div className="flex mb-3">
            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" className="mb-2"></Skeleton>
                <Skeleton width="5rem" className="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div className="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
      </div>
    );
  }

  function createLink(data, name) {
    return (
      <a href={data.externalUrls.externalUrls.spotify ?? ''} target="_blank">{name}</a>
    )
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

  function renderFavoriteButton(isFavorite) {
    if (isFavorite) {
      return (<Button className="favorite-button" onClick={() => handleFavoriteClickButton(false)} icon="pi pi-heart" size="large" rounded severity="help" aria-label="Favorite" data-pr-tooltip="Favorito" />)
    }
    return (<Button className="favorite-button" onClick={() => handleFavoriteClickButton(true)} icon="pi pi-heart" size="large" style={{ backgroundColor: '#ffffff' }} rounded text raised severity="help" aria-label="Favorite" data-pr-tooltip="Favorito" />)
  }

  function handleFavoriteClickButton(isFavorite) {

    const userFavoriteArtistRequest = {
      userId: userId,
      elementId: artistId
    }

    if (isFavorite) {
      axios.post('/samm/user/favorite/artist', userFavoriteArtistRequest)
        .then(response => {
          console.log(response.data)
          const favoriteArtists = response.data.artists;
          const favoriteArtist = favoriteArtists.find(artist => artist.spotifyApiId == artistId)
          if (favoriteArtist) {
            setIsFavorite(true)
            setFavoriteArtist(favoriteArtist);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios.delete('/samm/user/favorite/artist/' + userId + '/' + favoriteArtist.id,)
        .then(response => {
          console.log(response.data)
          setIsFavorite(false)
        })
        .catch(error => {
          console.error(error);
        });
    }

  }

  const { genres } = data;

  return (
    <div>
      <Header></Header>
      <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ margin: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img alt="Sem foto Disponível" src={((data.images && data.images[1]) && data.images[1].url) ?? ''} style={{ minHeight: '320px', minWidth: '320px', margin: '30px' }}></img>
          {isLoggedIn ? renderFavoriteButton(isFavorite) : ''}
        </div>
        <div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <SimpleCard title="Nome do(a) Artista:" width="12rem" bottom="2em" content={data.name} isRating={false}></SimpleCard>
            <SimpleCard title="Links do(a) Artista:" width="12rem" bottom="2em" content={createLink(data, "Spotify")} isRating={false}></SimpleCard>
            <SimpleCard title="Número de Seguidores:" width="12rem" bottom="2em" content={data.followers.total.toLocaleString()} isRating={false}></SimpleCard>
            <SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
            <SimpleCard title="Gêneros Musicais:" width="12rem" bottom="2em" content={capitalizeEachWord(genres && genres[0]) ?? 'Não Classificado'} isRating={false} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Artist
