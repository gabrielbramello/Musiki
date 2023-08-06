import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Menubar } from 'primereact/menubar';
import logo from '../../image/logo-color.png';

export default function Header() {

    const items = [
        {
            label: 'Página Inicial',
            icon: 'pi pi-fw pi-home',
            command: (event) => {
                window.location = "/";
            }
        },
        {
            label: 'Artistas',
            icon: 'pi pi-fw pi-at',
            command: (event) => {
                window.location = "/artist/74XFHRwlV6OrjEM0A2NCMF";
            }
        },
        {
            label: 'Albums',
            icon: 'pi pi-fw pi-book',
            command: (event) => {
                window.location = "/album/4sgYpkIASM1jVlNC8Wp9oF";
            }
        },
        {
            label: 'Musicas',
            icon: 'pi pi-fw pi-volume-up',
            command: (event) => {
                window.location = "/track/6SpLc7EXZIPpy0sVko0aoU";
            }
        },
        {
            label: 'Página do Usuário',
            icon: 'pi pi-fw pi-user',
            command: (event) => {
                window.location = "/paginadousuario";
            }
        },
        {
            label: 'Configurações',
            icon: 'pi pi-fw pi-cog',
            command: (event) => {
                window.location = "/configuracoes";
            }
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-cog',
            command: (event) => {
                window.location = "/login";
            }
        }
    ];

    const start = <img alt="logo" height= "70vh" width= "110vw" src={logo}></img>

    return (
                <Menubar style={{ height: "10vh"}} model={items} start={start} />
    )
}