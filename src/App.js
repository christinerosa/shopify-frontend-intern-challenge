import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {

  // States
  const [isLoading, setIsLoading] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);


  // API Requests
  const getData = async (searchValue) => {
    setIsLoading(true);
    let data = await axios.get(`http://www.omdbapi.com/?apikey=84d86ab5&type=movie&s=${searchValue}`);
    setSearchResults(data.data.Search);
    setIsLoading(false);
  }

  // Handles
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getData(e.target.value);
    }
  }

  const handleNomination = (movie) => {
      setNominations([...nominations, movie]);
  }

  const handleRemoveNomination = (movie) => {
    let updatedNoms = nominations.filter((t) => t !== movie);
    setNominations(updatedNoms);
  }

  return (
    <div>
      <h1>The Shoppies</h1>
      <div className="search">
        <label>Movie Title</label><br></br>
        <input type="text" onKeyDown={handleSearch}/>
      </div>
      {
        isLoading ? 
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
          </Spinner> 
        </div> : (
          <div className="voting-section">
            <div className="movie-results">
            {
              !searchResults ? 
              <p>No Results Found.</p> :
              searchResults.map((item, index) => {
                return (
                  <div className="movie-details">
                    <img src={item.Poster} alt=''/>
                    <div>
                        <h4>{item.Title}</h4>
                        <h6>{item.Year}</h6>
                        <button onClick={() => handleNomination(item)}>Nominate</button>
                    </div>
                  </div>
                )
              })
            }
            </div>
            <div className="nominations">
            {
              nominations.map((item, index) => {
                return (
                  <div className="movie-details">
                    <img src={item.Poster} alt=''/>
                    <div>
                        <h4>{item.Title}</h4>
                        <h6>{item.Year}</h6>
                        <button onClick={() => handleRemoveNomination(item)}>Remove</button>
                    </div>
                  </div>
                )
              })  
            }
            </div>
          </div>
        )
      }
    </div>
    
  );
}

export default App;

// Poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
// Title: "The Lord of the Rings: The Return of the King"
// Type: "movie"
// Year: "2003"
// imdbID: "tt0167260"
