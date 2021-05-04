import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from './components/MovieCard'

const App = () => {

  // States
  const [isLoading, setIsLoading] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [nominationCount, setNominationCount] = useState(0);


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
      setNominationCount(nominationCount + 1);
  }

  const handleRemoveNomination = (movie) => {
    let updatedNoms = nominations.filter((t) => t !== movie);
    setNominations(updatedNoms);
    setNominationCount(nominationCount - 1);
  }

  const disbaleNomination = (id) => {
    if (nominations.length === 5) {
      return true;
    } else {
      let nominatedItem = nominations.find((i) => i.imdbID === id);
      if(nominatedItem) {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <div>
      <h1>The Shoppies</h1>
      <div className="search">
        <label>Movie Title</label><br></br>
        <input type="text" onKeyDown={handleSearch}/>
      </div>
      {
        nominations.length === 5 ? 
        <h2>Maximum nominations reached!</h2> 
        : <h2>{nominationCount} movies nominated. {5 - nominationCount} nominations left.</h2>
      }
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
              searchResults.map((item) => {
                return (
                  <MovieCard 
                    key={item.imdbID}
                    poster={item.Poster}
                    title={item.Title}
                    year={item.Year}
                    type='nominate'
                    btnDisabled={disbaleNomination(item.imdbID)}
                    handleClick={() => handleNomination(item)}
                  />
                )
              })
            }
            </div>
            <div className="nominations">
            {
              nominations.map((item) => {
                return (
                  <MovieCard
                    key={item.imdbID}
                    poster={item.Poster}
                    title={item.Title}
                    year={item.Year}
                    type='remove'
                    btnDisabled={false}
                    handleClick={() => handleRemoveNomination(item)}
                  />
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
