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
import SimpleCard from './components/cards/SimpleCard';
import CardWithList from './components/cards/CardWithList';

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
			<div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
				<div style={{ margin: '50px' }}>
					<img alt="alternatetext" src={data.images && data.images[1].url} style={{ minHeight: '320px', minWidth: '320px' }}></img>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', margin: '50px' }}>
					<div>
						<SimpleCard title="Nome do(a) Artista:" width="12rem" bottom="2em" content={data.artists && data.artists[0].name} isRating={false}></SimpleCard>
						<SimpleCard title="Nome do Album:" width="12rem" bottom="2em" content={data.name} isRating={false}></SimpleCard>
						<SimpleCard title="Numero de Faixas:" width="12rem" bottom="2em" content={data.tracks && data.tracks.total} isRating={false}></SimpleCard>
					</div>
					<div>
						<SimpleCard title="Gravadora:" width="12rem" bottom="2em" content={data.label} isRating={false}></SimpleCard>
						<SimpleCard title="Popularidade:" width="12rem" bottom="2em" content={data.popularity} isRating={true}></SimpleCard>
						<SimpleCard title="Data de Lançamento:" width="12rem" bottom="2em" content={data.releaseDate} isRating={false}></SimpleCard>
					</div>
				</div>
				<div>
					<CardWithList title="Data de Lançamento:" width="30rem" bottom="2em" content={data.tracks && data.tracks.items} />
				</div>
			</div>

		</div>
	)
}

export default Album;