import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({poster, title, year, type, size, btnDisabled, handleClick}) => {
    return (
        <div className= "movie-details container" >
        { // Loads default image if no poster is provided.
            poster === "N/A" ? <img src="../images/film-reel.jpg" alt='Poster'/> : <img src={poster} alt='Poster'/>
        }
            <div className="overlay">
                <p className="movie-title">{title}</p>
                <h6>{year}</h6>
                {
                    type === 'nominate' ?
                    <button className="nominate-btn" disabled={btnDisabled} onClick={() => handleClick()}>Nominate</button>
                    : type === 'remove' ?
                    <button className="remove-btn" disabled={btnDisabled} onClick={() => handleClick()}>Remove</button>
                    : null
                }
            </div>
        </div>
    )
}


MovieCard.propTypes = {
    poster: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    handleClick: PropTypes.func
}

export default MovieCard;