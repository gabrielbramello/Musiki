import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                           //icons
import "../../App.css";
import axios from "../../apis/api";
import SimpleCard from '../../components/cards/SimpleCard';
import CardWithList from '../../components/cards/CardWithList';
import Header from '../../components/menu/Header';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton'; 
import { decodeToken } from '../../utils/Utils';

const Album = () => {

	const [data, setData] = useState({});
	const { albumId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userId, setUserId] = useState();
	const [favoriteAlbum, setFavoriteAlbum] = useState({});
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
	
		  axios.get('/samm/user/favorites/albuns/' + userId)
			.then(response => {
			  //setAudioFeatures(response.data)
			  console.log(response.data)
			  const favoriteAlbuns = response.data.favoritesAlbuns;
	
			  const favoriteAlbum = favoriteAlbuns.find(album => album.spotifyApiId == albumId)
			  if (favoriteAlbum) {
				setIsFavorite(true)
				setFavoriteAlbum(favoriteAlbum);
			  }
	
			})
			.catch(error => {
			  console.error(error);
			});
		}
	  }, []);

	useEffect(() => {

		axios.get('/spotify/album/' + albumId)
			.then(response => {
				setData(response.data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
				setIsLoading(false);
			});
	}, []);

	function changeDateFormat(dateString, releaseDatePrecision) {

		if (dateString != null) {
			if (releaseDatePrecision === "YEAR") {
				const [year] = dateString.split("-");
				if (year) {
					return year;
				}
			}

			if (releaseDatePrecision === "DAY") {
				const [year, month, day] = dateString.split("-");
				if (year && month && day) {
					const newDateFormat = `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
					return newDateFormat;
				}
			}
		}

		return "Formato de data inválido!";
	}


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
		)
	}
	console.log(data)

	function createLink(data, name) {
		return (
			<a href={data.externalUrls.externalUrls.spotify ?? ''} target="_blank">{name}</a>
		)
	}

	function renderFavoriteButton(isFavorite) {
		if (isFavorite) {
			return (<Button className="favorite-button" onClick={() => handleFavoriteClickButton(false)} icon="pi pi-heart" size="large" rounded severity="help" aria-label="Favorite" data-pr-tooltip="Favorito" />)
		}
		return (<Button className="favorite-button" onClick={() => handleFavoriteClickButton(true)} icon="pi pi-heart" size="large" style={{ backgroundColor: '#ffffff' }} rounded text raised severity="help" aria-label="Favorite" data-pr-tooltip="Favorito" />)
	}

	function handleFavoriteClickButton(isFavorite) {

		const userFavoriteAlbumRequest = {
		  userId: userId,
		  elementId: albumId
		}
	
		if (isFavorite) {
		  axios.post('/samm/user/favorite/album', userFavoriteAlbumRequest)
			.then(response => {
			  console.log(response.data)
			  const favoriteAlbuns = response.data.albuns;
			  const favoriteAlbum = favoriteAlbuns.find(album => album.spotifyApiId == albumId)
			  if (favoriteAlbum) {
				setIsFavorite(true)
				setFavoriteAlbum(favoriteAlbum);
			  }
			})
			.catch(error => {
			  console.error(error);
			});
		} else {
		  axios.delete('/samm/user/favorite/album/'+userId+'/'+favoriteAlbum.id, )
			.then(response => {
			  console.log(response.data)
			  setIsFavorite(false)
			})
			.catch(error => {
			  console.error(error);
			});
		}
	
	  }

	return (
		<div>
			<Header />
			<div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
				<div style={{ margin: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<img alt="Sem foto Disponível" src={((data.images && data.images[1]) && data.images[1].url) ?? ''} style={{ minHeight: '320px', minWidth: '320px', margin: '30px' }}></img>
					{isLoggedIn ? renderFavoriteButton(isFavorite) : ''}
				</div>
				<div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', margin: '50px' }}>
					<div>
						<SimpleCard
							title="Nome do(a) Artista:"
							width="12rem"
							bottom="2em"
							content={
								data.artists && data.artists[0] ? (
									<Link to={`/artist/${data.artists[0].id}`}>
										{data.artists[0].name}
									</Link>
								) : (
									'Não Classificado'
								)
							}
							isRating={false}
						/>
						<SimpleCard title="Nome do Album:" width="12rem" bottom="2em" content={createLink(data, data.name)} isRating={false}></SimpleCard>
						<SimpleCard title="Numero de Faixas:" width="12rem" bottom="2em" content={data.tracks.total ?? 'Não Classificado'} isRating={false}></SimpleCard>
					</div>
					<div>
						<SimpleCard title="Gravadora:" width="12rem" bottom="2em" content={data.label} isRating={false}></SimpleCard>
						<SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
						<SimpleCard title="Lançamento:" width="12rem" bottom="2em" content={changeDateFormat(data.releaseDate, data.releaseDatePrecision)} isRating={false}></SimpleCard>
					</div>
				</div>
				<div>
					<CardWithList title="Detalhes do Disco:" width="30rem" bottom="2em" content={data.tracks.items ?? 'Não Classificado'} />
				</div>
			</div>

		</div>
	)
}

export default Album;