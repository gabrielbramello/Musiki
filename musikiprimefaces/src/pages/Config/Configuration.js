import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "../../App.css";
import Header from '../../components/menu/Header';
import GradientCircleChart from '../../components/GradientCircleChart';

export default function Configuration() {

  return (
    <div>
      <Header />
      {/* <div style={{ 'fontSize': '3em', 'text-align': 'center' }}>
        <p>Pagina - Configurações</p>
        <p>Em construção...</p>
        <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '2em' }}></i>
      </div> */}
      <div>
      <GradientCircleChart />
      <h1>Grafico1</h1>
      </div>
      <div>
      <GradientCircleChart />
      <h1>Grafico2</h1>
      </div>
    </div>
  )
}
