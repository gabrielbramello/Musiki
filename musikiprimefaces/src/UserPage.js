import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu/Menu';
import "./App.css";

export default function UserPage() {

    return (
            <div>
                <Menu></Menu>
                <h2>Pagina de Configuração do Usuario</h2>
                <h3>Pagina em construção...</h3>
            </div>
    )
}
