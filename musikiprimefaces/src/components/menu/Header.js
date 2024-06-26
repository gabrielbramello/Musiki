import React, { useEffect, useRef, useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Menubar } from 'primereact/menubar';
import logo from '../../image/logo-color.png';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { jwtDecode } from 'jwt-decode';
import axios from "../../apis/api";

export default function Header() {

    const [userInfo, setUserInfo] = useState({name: '', login: '', email:''});
    const menuRight = useRef(null);


    useEffect(() => {
        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            const decodedToken = decodeToken(localStorage.getItem('authToken'));
            const userId = decodedToken.sub

            axios.get('/samm/user/' + userId)
                .then(response => {
                    console.log(response)
                    setUserInfo(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [])

    const userItems = [
        {
            items: [
                {
                    label: 'Usuário',
                    icon: 'pi pi-refresh',
                    command: (event) => {
                        window.location = "/user";
                    }
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-upload',
                    command: () => {

                        localStorage.removeItem('authToken');
                        window.location = "/";

                    }
                }
            ]
        }
    ];
    const items = [
        {
            label: 'Página Inicial',
            icon: 'pi pi-fw pi-home',
            command: (event) => {
                window.location = "/";
            }
        },
        {
            label: 'Recomendações',
            icon: 'pi pi-fw pi-search',
            command: (event) => {
                window.location = "/recommendations/";
            }
        },
        {
            label: 'Artista',
            icon: 'pi pi-fw pi-at',
            command: (event) => {
                window.location = "/artist/74XFHRwlV6OrjEM0A2NCMF";
            }
        },
        {
            label: 'Album',
            icon: 'pi pi-fw pi-book',
            command: (event) => {
                window.location = "/album/4sgYpkIASM1jVlNC8Wp9oF";
            }
        },
        {
            label: 'Musica',
            icon: 'pi pi-fw pi-volume-up',
            command: (event) => {
                window.location = "/track/6SpLc7EXZIPpy0sVko0aoU";
            }
        }
    ];

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

    const start = <img alt="logo" height="70vh" width="110vw" src={logo}></img>

    const end = () => {

        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined && localStorage.getItem('authToken') != 'undefined') {
            return (
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user" onClick={(event) => menuRight.current.toggle(event)} rounded aria-label="User" />
                    <div style={{marginLeft:'5px'}}>{userInfo.name}</div>                   
                    <Menu model={userItems} popup ref={menuRight} id="popup_menu_right" popupAlignment="left" />
                </div>
            )
        }
        return (
            <div className="flex align-items-center gap-2">
                <Button icon="pi pi-users" onClick={(event) => window.location = "/login"} label="Login" rounded />
                <Button label="Registrar" onClick={(event) => window.location = "/register"} rounded />
            </div>
        )
    }




    return (
        <Menubar style={{ height: "10vh", paddingTop: '20px', paddingLeft: '30px', paddingLeft: '100px', paddingRight: '150px' }} model={items} start={start} end={end} />
    )
}