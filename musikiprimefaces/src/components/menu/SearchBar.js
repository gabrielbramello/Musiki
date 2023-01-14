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

    api.get('/spotify/search/' + wordEntered)
      .then(response => setData(response.data))
      .catch(error => console.log(error.message))
      console.log(data);

  const newFilter = data.filter((value) => {

    if (value.type === "ALBUM") {
      sourceUrl = '/spotify/album/'
      paginaDestino = "/albums"
    }
    if (value.type === "ARTIST")  {
      sourceUrl = '/spotify/artist/'
      paginaDestino = "/artistas"
    }
    if(value.type === "TRACK") {
      sourceUrl = '/spotify/track/'
      paginaDestino = "/musicas"
    }
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
            console.log(value)
            return (
              <Link className="dataItem" key={key} to= { `${value.type}/${value.id}`}>
                <p>{`${value.name} - (${value.type})`}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
