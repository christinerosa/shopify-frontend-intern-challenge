import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import SiteHeader from './components/SiteHeader';
import Banner from './components/Banner';
import LoadingSpinner from './components/LoadingSpinner';
import  { BiSearch } from 'react-icons/bi';
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

  // Clears search results.
  const clearSearch = () => {
    setSearchResults([]);
  }

  // Loads local storage into nominations array
  useEffect(() => {
    let currentNominations = JSON.parse(localStorage.getItem('nominations'));
    if (currentNominations) {
      setNominations(currentNominations);
    }
  }, [])

  /****************** App ******************/
  return (
    <div>
      <SiteHeader />
      <div className="search">
        <BiSearch className="search-icon" size={24}/>
        <input type="text" placeholder="Search Movies" onKeyDown={handleSearch}/>
      </div>
      <Banner length={nominations.length} clearSearch={() => clearSearch()}/>
      { // Displays spinner while waiting for data to load, otherwise, data is displayed
        isLoading ? 
        <LoadingSpinner />
        : <div className="voting-section">
            <div>
            { // Displays number of search results (if any)
              searchResults && searchResults.length > 0 ? <h6>{searchResults.length} Search Results</h6> : null 
            }
              <div className="results">
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
            </div>
            <div className="nomination-wrapper">
            { 
              nominations.length > 0 ? <h6>Your Nomination List</h6> : null
            }
              <div id="nomination-list" className="nominations">
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
          </div>
      }
    </div>
    
  );
}

export default App;

