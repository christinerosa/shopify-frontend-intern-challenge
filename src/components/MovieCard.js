import React from 'react';

const MovieCard = ({poster, title, year, type, btnDisabled, handleClick}) => {
    return (
        <div className="movie-details">
        { // Loads default image if no poster is provided.
            poster === "N/A" ? <img src="../images/film-reel.jpg" alt='Poster'/> : <img src={poster} alt='Poster'/>
        }
            <div>
                <h4>{title}</h4>
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

export default MovieCard;