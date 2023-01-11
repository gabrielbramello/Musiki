import React, { useState } from "react";
import "./SearchBar.css";
import 'primeicons/primeicons.css';
import api from "../../api/api";


function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    api.get('/spotify/search/artist/' + wordEntered)
      .then(response => setData(response.data))
      console.log(data)
    const newFilter = data.filter((value) => {
      console.log(value.name)
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
              <a key={key} className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
