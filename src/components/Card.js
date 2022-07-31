import React, { useEffect, useState } from 'react';
import './Card.css'

export function Card({card, clickHandler, flipBack}) {
    const [flipped, setFlipped] = useState(false);
    useEffect(() => {
        setFlipped(flipped && !flipBack);
    }, [flipBack, flipped]);

    function handleClick() {
        setFlipped(!flipped);
        clickHandler(card);
    }

    return (
        <div className='card' key={card.id}>
            <div className={flipped || card.matched ? "flipped" : ""}>
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