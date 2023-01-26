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

const Album = () => {

	const [data, setData] = useState({});
	const { albumId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Set the loading flag to true
		setIsLoading(true);

		// Use the axios.get() method to make a GET request to the API endpoint
		axios.get('/spotify/album/' + albumId)
			.then(response => {
				// Update the data and loading flag state
				setData(response.data);
			})
			.catch(error => {
				// Handle any errors that occurred during the request
				console.error(error);
				// Set the loading flag to false
				setIsLoading(false);
			});
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <p>Api do Spotify Carregando...</p>;
	}

	function convertMilliseconds(data) {
		var minutes = Math.floor(data / 60000);
		var seconds = ((data % 60000) / 1000).toFixed(0);
		return "" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	function capitalizeEachWord(sentence) {
		return sentence.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	function changeDateFormat(dateString) {
		// Use o método split() para dividir a string da data em ano, mês e dia
		const dateArr = dateString.split("-");
		// Verifica se o formato é válido (yyyy-mm-dd)
		if (dateArr.length !== 3) {
			return "Formato de data inválido!";
		}
		// Adiciona zeros a esquerda para os dias e meses com menos de 2 dígitos
		const day = dateArr[2].padStart(2, "0");
		const month = dateArr[1].padStart(2, "0");
		const year = dateArr[0];
		// Junta as partes da data no formato correto (dd-mm-yyyy)
		const newDateFormat = `${day}-${month}-${year}`;
		return newDateFormat;
	}

	console.log(data)

	return (
		<div>
			<Header />
			{isLoading ?
				<p>Api do Spotify Carregando...</p> 
				:
				<div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
					<div style={{ margin: '50px' }}>
						<img alt="alternatetext" src={data.images && data.images[1].url} style={{ minHeight: '320px', minWidth: '320px' }}></img>
					</div>
					<div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', margin: '50px' }}>
						<div>
							<SimpleCard title="Nome do(a) Artista:" width="12rem" bottom="2em" content={data.artists && data.artists[0].name} isRating={false}></SimpleCard>
							<SimpleCard title="Nome do Album:" width="12rem" bottom="2em" content={data.name} isRating={false}></SimpleCard>
							<SimpleCard title="Numero de Faixas:" width="12rem" bottom="2em" content={data.tracks && data.tracks.total} isRating={false}></SimpleCard>
						</div>
						<div>
							<SimpleCard title="Gravadora:" width="12rem" bottom="2em" content={data.label} isRating={false}></SimpleCard>
							<SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
							<SimpleCard title="Data de Lançamento:" width="12rem" bottom="2em" content={changeDateFormat(data.releaseDate)} isRating={false}></SimpleCard>
						</div>
					</div>
					<div>
						<CardWithList title="Detalhes do Disco:" width="30rem" bottom="2em" content={data.tracks && data.tracks.items} />
					</div>
				</div>
			}



		</div>
	)
}

export default Album;