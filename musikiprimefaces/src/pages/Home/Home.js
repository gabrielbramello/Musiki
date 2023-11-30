import React from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                  //icons
import "../../App.css";
import Header from '../../components/menu/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import Footer from '../../components/menu/Footer';

export default function Home() {
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="App">
        <SearchBar placeholder="O que deseja descobrir hoje?"></SearchBar>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}