import React, { useState } from 'react';
import axios from 'axios';

function App() {

  // States
  const [searchResults, setSearchResults] = useState([]);


  // API Requests
  const getData = async (searchValue) => {
    console.log(searchValue);
    let data = await axios.get(`http://www.omdbapi.com/?apikey=84d86ab5&type=movie&s=${searchValue}`);
    setSearchResults(data.data.Search);
    console.log(searchResults);
  }

  // Handles
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getData(e.target.value);
    }
  }

  return (
    <div>
      <h1>The Shoppies</h1>
      <div className='search'>
        <label>Movie Title</label><br></br>
        <input type="text" onKeyDown={handleSearch}/>
      </div>
      <div>
        {
          !searchResults ? 
          <p>No Results Found.</p> :
          searchResults.map((item, index) => {
            return (
                <div key={index}>
                  <img src={item.Poster} alt=''/>
                  <h2>{item.Title}</h2>
                  <h4>{item.Year}</h4>
                </div>
              )
          })
        }
      </div>
    </div>
    
  );
}

export default App;

// Poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
// Title: "The Lord of the Rings: The Return of the King"
// Type: "movie"
// Year: "2003"
// imdbID: "tt0167260"
