import React, { useState } from 'react';
import './Card.css'

export function Card({card, clickHandler}) {
    const [flipped, setFlipped] = useState(false);

    function handleClick() {
        setFlipped(!flipped);
        clickHandler(card);
    }

    return (
        <div className='card' key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="front" alt="card front"/>
                <img 
                    src="/img/back.jpg" 
                    className="back" 
                    alt="card back" 
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}