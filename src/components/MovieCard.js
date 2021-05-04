import React from 'react';

const MovieCard = ({poster, title, year, type, btnDisabled, handleClick}) => {
    return (
        <div className="movie-details">
            <img src={poster} alt=''/>
            <div>
                <h4>{title}</h4>
                <h6>{year}</h6>
                {
                    type === 'nominate' ?
                    <button disabled={btnDisabled} onClick={() => handleClick()}>Nominate</button>
                    : type === 'remove' ?
                    <button disabled={btnDisabled} onClick={() => handleClick()}>Remove</button>
                    : null
                }
            </div>
        </div>
    )
}

export default MovieCard;