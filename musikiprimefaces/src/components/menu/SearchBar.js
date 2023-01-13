import React, { useState } from "react";
import "./SearchBar.css";
import 'primeicons/primeicons.css';
import api from "../../api/api";
import { Link } from "react-router-dom";


function SearchBar({ placeholder }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  let sourceUrl = ''
  let paginaDestino = ''

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    api.get('/spotify/search/artist/' + wordEntered)
      .then(response => setData(response.data))
      console.log(data)

  const newFilter = data.filter((value) => {

    if (value.type === "ALBUM") {
      sourceUrl = '/spotify/search/album/'
      paginaDestino = "/albums"
    }
    if (value.type === "ARTIST")  {
      sourceUrl = '/spotify/search/artist/'
      paginaDestino = "/artistas"
    }
    if(value.type === "TRACK") {
      sourceUrl = '/spotify/search/track/'
      paginaDestino = "/musicas"
    }
      console.log(value.name)
      console.log(value.id)
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (

    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <i className="pi pi-search" style={{'fontSize': '2em'}}></i>
           ) : (
            <i className="pi pi-times" style={{'fontSize': '2em'}} id="clearBtn" onClick={clearInput} ></i>
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a key={key} className="dataItem" href={'/artistas'} id={value.id} onClick={id = data.id}>
                <p>{value.name}<Link to='/artistas'></Link></p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
