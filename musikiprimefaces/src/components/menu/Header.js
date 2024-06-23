import React, { useRef } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Menubar } from 'primereact/menubar';
import logo from '../../image/logo-color.png';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

export default function Header() {

    const menuRight = useRef(null);


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
                    icon: 'pi pi-upload'
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
                window.location = "/track2/6SpLc7EXZIPpy0sVko0aoU";
            }
        }
    ];

    const start = <img alt="logo" height="70vh" width="110vw" src={logo}></img>

    const end = () => {

        if (localStorage.getItem('authToken') != null && localStorage.getItem('authToken') != undefined) {
            return (
                <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user"  onClick={(event) => menuRight.current.toggle(event)} rounded aria-label="User" />Gabriel Mello
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
        <Menubar style={{ height: "10vh", paddingTop: '20px', paddingLeft: '30px', paddingLeft: '100px', paddingRight: '100px' }} model={items} start={start} end={end} />
    )
}