import React from 'react';

const Banner = ({length, clearSearch}) => {
    return (
        <div className={length === 5 ? "banner banner-flash" : "banner"}>
        { // Keeps track of nomination count. 
            length === 5 ? 
            <div>
                <h4>Maximum nominations reached!</h4> 
                <p>Review your list <a href="nomination-list" onClick={() => clearSearch()}>here</a> to make changes.</p>
            </div>
            : length === 1 ? <h4>{length} movie nominated. {5 - length} nominations left.</h4>
            : (5 - length) === 1 ? <h4>{length} movies nominated. {5 - length} nomination left.</h4> 
            : <h4>{length} movies nominated. {5 - length} nominations left.</h4> 
        }
        </div>
    )
}

export default Banner;