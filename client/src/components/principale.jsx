import './principale.scss';
import logo from '../assets/logo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Principale() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchSearchResults = async () => {
        const { data } = await axios.get(
          `http://192.168.0.9:3000/restaurant?name=${searchTerm}`
        );
        setSearchResults(data);
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterResults = () => {
    return searchResults.filter(result => result.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  }

  return (
    <div>
      <div className="box">
        <img src={logo} alt="Logo" width="100" height="100"/>
        <h1>YESHOW</h1>
        <div className="container-input">
          <input 
            required 
            type="text" 
            name="text" 
            autoComplete="off" 
            value={searchTerm}
            onChange={handleInputChange}
            className="input" 
          />
          <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 
              0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 
              0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 
              193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 
              790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
          </svg>
          {searchResults.length > 0 && (
            <ul className="search-results">
              {filterResults().slice(0, 5).map((result) => (
                <li key={result._id}>
                  <a href={`/restaurant/${result._id}`}>{result.name} - {result.address}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p>
          <a href="#">bug report</a>
        </p>
      </div>

      <div className="footer">
        <ul>
          <li><a href="#">About us</a></li>
          <li id="footer-li-center"><a href="#">Work with us</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
      </div>
    </div>
  );
}
