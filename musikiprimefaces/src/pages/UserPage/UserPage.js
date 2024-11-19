import React, { useEffect, useRef, useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "../../App.css";
import Header from '../../components/menu/Header';
import { Menu } from 'primereact/menu';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jwtDecode } from 'jwt-decode';
import axios from "../../apis/api";
import { decodeToken } from '../../utils/Utils';
import { Toast } from 'primereact/toast';

export default function UserPage() {

    const [products, setProducts] = useState([]);
    const [userInfo, setUserInfo] = useState({ name: '', login: '', email: '' });

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');

    const [userId, setUserId] = useState();
    const [favoritesArtists, setFavoritesArtists] = useState({});
    const [favoritesAlbuns, setFavoritesAlbuns] = useState({});
    const [favoritesTracks, setFavoritesTracks] = useState({});

    const [isRegistrationDataVisible, setIsRegistrationDataVisible] = useState(true)
    const [isUserFavoritesAlbunsVisible, setIsUserFavoritesAlbunsVisible] = useState(false)
    const [isUserFavortiesArtistsVisible, setIsUserFavortiesArtistsVisible] = useState(false)
    const [isUserFavoritesTracksVisible, setIsUserFavoritesTracksVisible] = useState(false)

    const toast = useRef(null);

    const handleUpdate = (e) => {
        const userSammRequest = {
            name: nome,
            email: email
        }

        axios.put('/samm/user/update/' + userId, userSammRequest)
            .then(response => {
                console.log(response)
                showSuccess('Usuário atualizado com sucesso')
                setTimeout(() => {
                    window.location.reload();  
                }, 2000);
            })            
            .catch(error => {
                console.error(error);
            });

        console.log({
            nome,
            email
        });
    };

    useEffect(() => {
        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            const decodedToken = decodeToken(localStorage.getItem('authToken'));
            const userId = decodedToken.sub

            setUserId(userId);

            axios.get('/samm/user/' + userId)
                .then(response => {
                    console.log(response)
                    setUserInfo(response.data)
                    setNome(response.data.name);
                    setEmail(response.data.email)
                    setLogin(response.data.login)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])

    //favorite artists request
    useEffect(() => {
        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            const decodedToken = decodeToken(localStorage.getItem('authToken'));
            const userId = decodedToken.sub

            axios.get('/samm/user/favorites/artists/' + userId)
                .then(response => {
                    //setAudioFeatures(response.data)
                    const favoriteArtists = response.data.favoritesArtists;
                    console.log(favoriteArtists)
                    setFavoritesArtists(favoriteArtists);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])

    //favorite album request
    useEffect(() => {
        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            const decodedToken = decodeToken(localStorage.getItem('authToken'));
            const userId = decodedToken.sub

            axios.get('/samm/user/favorites/albuns/' + userId)
                .then(response => {
                    //setAudioFeatures(response.data)
                    const favoriteAlbuns = response.data.favoritesAlbuns;
                    console.log(favoriteAlbuns)
                    setFavoritesAlbuns(favoriteAlbuns);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])

    //favorite track request
    useEffect(() => {
        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            const decodedToken = decodeToken(localStorage.getItem('authToken'));
            const userId = decodedToken.sub

            axios.get('/samm/user/favorites/tracks/' + userId)
                .then(response => {
                    //setAudioFeatures(response.data)

                    const favoriteTracks = response.data.favoritesTracks;
                    console.log(favoriteTracks)
                    setFavoritesTracks(favoriteTracks);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])


    const items = [
        {
            label: 'Usuário',
            items: [
                {
                    label: 'Dados Cadastrais',
                    icon: 'pi pi-refresh',
                    command: () => {
                        setIsRegistrationDataVisible(true)
                        setIsUserFavoritesAlbunsVisible(false)
                        setIsUserFavortiesArtistsVisible(false)
                        setIsUserFavoritesTracksVisible(false)
                    }
                }
            ]
        },
        {
            label: 'Favoritos',
            items: [
                {
                    label: 'Artistas Favoritos',
                    icon: 'pi pi-external-link',
                    command: (e) => {
                        setIsRegistrationDataVisible(false)
                        setIsUserFavoritesAlbunsVisible(false)
                        setIsUserFavortiesArtistsVisible(true)
                        setIsUserFavoritesTracksVisible(false)
                    }
                },
                {
                    label: 'Albuns Favoritos',
                    icon: 'pi pi-upload',
                    command: (e) => {
                        setIsRegistrationDataVisible(false)
                        setIsUserFavoritesAlbunsVisible(true)
                        setIsUserFavortiesArtistsVisible(false)
                        setIsUserFavoritesTracksVisible(false)
                    }
                },
                {
                    label: 'Músicas Favoritos',
                    icon: 'pi pi-upload',
                    command: (e) => {
                        setIsRegistrationDataVisible(false)
                        setIsUserFavoritesAlbunsVisible(false)
                        setIsUserFavortiesArtistsVisible(false)
                        setIsUserFavoritesTracksVisible(true)
                    }
                }
            ]
        }
    ];

    function renderRegistrationData(isVisible) {
        return (
            <div>
                {
                    isVisible ?
                        <div className="p-p-4">
                            <Card title="Editar Configurações do Usuário" className="p-mb-4">
                                <form>
                                    <div className="p-field"  style={{ margin: '15px' }}>
                                        <label htmlFor="login" className="p-d-block" style={{ textAlign: 'left' }}>Login: </label>
                                        <InputText id="login" type="login" value={login} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} disabled />
                                    </div> 
                                    <div className="p-field"  style={{ margin: '15px' }}>
                                        <label htmlFor="nome" className="p-d-block" style={{ textAlign: 'left' }}>Nome: </label>
                                        <InputText id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                                    </div>
                                    <div className="p-field"  style={{ margin: '15px' }}>
                                        <label htmlFor="email" className="p-d-block" style={{ textAlign: 'left' }}>Email: </label>
                                        <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                                    </div>                                                                     
                                </form>
                            </Card>
                            <div className="p-d-flex p-jc-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button label="Atualizar Dados" style={{ margin: '15px' }} className="p-button-sm" onClick={handleUpdate} />
                            </div>
                        </div>
                        : ''
                }

            </div>
        )
    }

    function renderUserFavoritesAlbuns(isVisible) {
        return (
            <div>
                {
                    isVisible ?
                        <div className="p-p-4">
                            <Card title="Albuns Favoritos" className="p-mb-4">
                                <DataTable value={favoritesAlbuns} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} emptyMessage="Ainda não favoritou nenhum album?">
                                    {/*<Column field="id" header="ID"></Column> */}
                                    <Column field="name" header="Nome"></Column>
                                    <Column body={(e) => renderDetailButton(e, 'album')} header="Detalhes"></Column>
                                </DataTable>
                            </Card>
                        </div>
                        : ''
                }
            </div>
        )
    }

    function renderUserFavortiesArtists(isVisible) {
        return (
            <div>
                {
                    isVisible ?
                        <div className="p-p-4">
                            <Card title="Artistas Favoritos" className="p-mb-4">
                                <DataTable value={favoritesArtists} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} emptyMessage="Ainda não favoritou nenhum artista?">
                                    {/*<Column field="id" header="ID"></Column> */}
                                    <Column field="name" header="Nome"></Column>
                                    <Column field="simplifiedGenres" header="Gênero(s)"></Column>
                                    <Column body={(e) => renderDetailButton(e, 'artist')} header="Detalhes"></Column>
                                </DataTable>
                            </Card>
                        </div>
                        : ''
                }
            </div>
        )
    }

    function renderUserFavoritesTracks(isVisible) {
        return (
            <div>
                {
                    isVisible ?
                        <div className="p-p-4">
                            <Card title="Músicas Favoritas" className="p-mb-4">
                                <DataTable value={favoritesTracks} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} emptyMessage="Ainda não favoritou nenhuma musica?">
                                    {/*<Column field="id" header="ID"></Column>*/}
                                    <Column field="name" header="Título da Faixa"></Column>
                                    <Column body={(e) => renderDetailButton(e, 'track')} header="Detalhes"></Column>
                                </DataTable>
                            </Card>
                        </div>
                        : ''
                }
            </div>
        )
    }

    function renderDetailButton(rowData, type) {
        return <Button icon="pi pi-search" onClick={() => { linkTo(type, rowData) }} rounded outlined severity="success" aria-label="Search" />
    }

    function linkTo(type, value) {
        const url = `/${type}/${value.spotifyApiId}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }
    return (
        <div>
            <Header />
            <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex' }}>
                <Toast ref={toast} />
                <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', height: '100%' }}>
                    <Menu style={{ height: '100vh' }} model={items} />
                </div>
                <div className="card" style={{ flex: '1', margin: '20px', backgroundColor: 'white', padding: '30px' }}>
                    {renderRegistrationData(isRegistrationDataVisible)}
                    {renderUserFavortiesArtists(isUserFavortiesArtistsVisible)}
                    {renderUserFavoritesAlbuns(isUserFavoritesAlbunsVisible)}
                    {renderUserFavoritesTracks(isUserFavoritesTracksVisible)}
                </div>
            </div>

        </div>

    )
}
