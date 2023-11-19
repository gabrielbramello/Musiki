import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import 'primeicons/primeicons.css';
import axios from "../../apis/api";
import { Link } from "react-router-dom";


function SearchBar({ placeholder }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get('/spotify/search/' + wordEntered)
      .then(response => {
        if (isMounted) {
          setData(response.data);
        }
      })
      .catch(error => console.log(error.message));

    return () => {
      isMounted = false;
    };
  }, [wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setWordEntered(searchWord);

  const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord);
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
