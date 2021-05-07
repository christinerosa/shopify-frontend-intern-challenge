import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from './components/MovieCard';
require('dotenv').config();

const App = () => {

  /****************** States ******************/ 
  const [isLoading, setIsLoading] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  /*************** API Request ***************/
  const getData = async (searchValue) => {
    setIsLoading(true);
    let data = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&type=movie&s=${searchValue}`);
    setSearchResults(data.data.Search);
    setIsLoading(false);
  }

  /****************** Actions ******************/ 
  
  // Passes search value into getData function when user hits "Enter" key.
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      getData(e.target.value);
    }
  }

  /*
   * Appends selected movie to nominations array and stores current 
   * nomination list in local storage.
   */
  const handleNomination = (movie) => {
      let nominationList = [...nominations, movie];
      setNominations(nominationList);
      localStorage.setItem('nominations', JSON.stringify(nominationList))
  }

  /* 
   * Filters through the nomination array, removes the selected movie, 
   * updates the array, and stores it in local storage.
   */
  const handleRemoveNomination = (movie) => {
    let updatedNoms = nominations.filter((t) => t !== movie);
    setNominations(updatedNoms);
    localStorage.setItem('nominations', JSON.stringify(updatedNoms))
  }

  /*
   * Disables nomination button after selected and disables all nominations buttons when 
   * the maximum number of nominations is reached.
   */
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

  // Loads local storage into nominations array
  useEffect(() => {
    let currentNominations = JSON.parse(localStorage.getItem('nominations'));
    setNominations(currentNominations);
  }, [])

  return (
    <div>
      <h1>The Shoppies</h1>
      <div className="search">
        <input type="text" placeholder="Search Movies" onKeyDown={handleSearch}/>
      </div>
      <div className="banner">
      { // Keeps track of nomination count. 
        nominations.length === 5 ? 
        <h4>Maximum nominations reached!</h4> 
        : nominations.length === 1 ? <h4>{nominations.length} movie nominated. {5 - nominations.length} nominations left.</h4>
        : (5 - nominations.length) === 1 ? <h4>{nominations.length} movies nominated. {5 - nominations.length} nomination left.</h4> 
        : <h4>{nominations.length} movies nominated. {5 - nominations.length} nominations left.</h4> 
      }
      </div>
      { // Displays spinner while waiting for data to load, otherwise, data is displayed
        isLoading ? 
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
          </Spinner> 
        </div> : (
          <div className="voting-section">
            <div className="list results">
            { // Displays number of search results (if any)
              searchResults && searchResults.length > 0 ? <h6>{searchResults.length} Search Results</h6> : null 
            }
            {
              !searchResults ? 
              <p>No Results Found.</p> :
              searchResults.map((item) => { // Maps through results to dynamically load MovieCard component for each
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
            <div className="list nominations">
            { 
              nominations.length > 0 ? <h6>Your Nomination List</h6> : null
            }
            {
              nominations.map((item) => { // Maps through nomination array to dynamically load MovieCard component for each
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

