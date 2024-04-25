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

const Album = () => {

	const [data, setData] = useState({});
	const { albumId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		setIsLoading(true);

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
		return <p>Api do Spotify Carregando...</p>;
	  }
	console.log(data)

	function createLink(data, name) {
		return (
		  <a href={data.externalUrls.externalUrls.spotify ?? ''} target="_blank">{name}</a>
		)
	  }

	return (
		<div>
            <Header />
			<div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
				<div style={{ margin: '50px' }}>
					<img alt="Sem foto Disponível" src={((data.images && data.images[1]) && data.images[1].url) ?? ''} style={{ minHeight: '320px', minWidth: '320px' }}></img>
				</div>
				<div style={{ textAlign: 'center',display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', margin: '50px' }}>
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