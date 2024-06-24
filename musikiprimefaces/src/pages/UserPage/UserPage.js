import React, { useEffect, useState } from 'react';
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

export default function UserPage() {

    const [products, setProducts] = useState([]);
    const [userInfo, setUserInfo] = useState({name: '', login: '', email:''});

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [isRegistrationDataVisible, setIsRegistrationDataVisible] = useState(true)
    const [isUserFavoritesAlbunsVisible, setIsUserFavoritesAlbunsVisible] = useState(false)
    const [isUserFavortiesArtistsVisible, setIsUserFavortiesArtistsVisible] = useState(false)
    const [isUserFavoritesTracksVisible, setIsUserFavoritesTracksVisible] = useState(false)

    const handleUpdate = () => {
        // Lógica para atualizar os dados do usuário
        console.log({
            nome,
            email,
            senha
        });
    };

    useEffect(() => {
        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            const decodedToken = decodeToken(localStorage.getItem('authToken'));
            const userId = decodedToken.sub

            axios.get('/samm/user/' + userId)
                .then(response => {
                    console.log(response)
                    setUserInfo(response.data)
                    setNome(response.data.name);
                    setEmail(response.data.email)
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])

        // Função para decodificar o token
        const decodeToken = (token) => {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded)
                return decoded;
            } catch (error) {
                console.error('Invalid token', error);
            }
        };

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
                                    <div className="p-field">
                                        <label htmlFor="nome" className="p-d-block" style={{ textAlign: 'left' }}>Nome</label>
                                        <InputText id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="email" className="p-d-block" style={{ textAlign: 'left' }}>Email</label>
                                        <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="senha" className="p-d-block" style={{ textAlign: 'left' }}>Senha</label>
                                        <Password id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="p-password-sm p-d-block" style={{ width: '100%' }} />
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
                                <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
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

    function renderUserFavortiesArtists(isVisible) {
        return (
            <div>
                {
                    isVisible ?
                        <div className="p-p-4">
                            <Card title="Artistas Favoritos" className="p-mb-4">
                                <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
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

    function renderUserFavoritesTracks(isVisible) {
        return (
            <div>
                {
                    isVisible ?
                        <div className="p-p-4">
                            <Card title="Músicas Favoritas" className="p-mb-4">
                                <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="code" header="Code"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="category" header="Category"></Column>
                                    <Column field="quantity" header="Quantity"></Column>
                                </DataTable>
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

    return (
        <div>
            <Header />
            <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex' }}>
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
