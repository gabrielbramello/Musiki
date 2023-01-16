import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import logo from '../../images/logo-color.png';


export default function Menu() {

    const items = [
        {
            label: 'Página Inicial',
            icon: 'pi pi-fw pi-home'
        },
        {
            label: 'Artistas',
            icon: 'pi pi-fw pi-at'
        },
        {
            label: 'Albums',
            icon: 'pi pi-fw pi-book'
        },
        {
            label: 'Musicas',
            icon: 'pi pi-fw pi-volume-up'
        },
        {
            label: 'Página do Usuário',
            icon: 'pi pi-fw pi-user'
        },
        {
            label: 'Configurações',
            icon: 'pi pi-fw pi-cog'
        }
    ];

    const start = <img alt="logo" height= "40px" width= "50px" src={logo}></img>

    return (
                <Menubar style={{ height: "50px"}} model={items} start={start} />
    )
}