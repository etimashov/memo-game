import { useState } from 'react';
import { Card } from './components/Card'
import './App.css';

const CARDS = [
  {src: "/img/01-card.jpg", matched: false},
  {src: "/img/02-card.jpg", matched: false},
  {src: "/img/03-card.jpg", matched: false},
  {src: "/img/04-card.jpg", matched: false},
  {src: "/img/05-card.jpg", matched: false},
  {src: "/img/06-card.jpg", matched: false},
  {src: "/img/07-card.jpg", matched: false},
  {src: "/img/08-card.jpg", matched: false}
];

function App() {  
  const [deck, setDeck] = useState([]);
  const [turns, setTurns] = useState(0);
  
  function startGame() {
    let newDeck = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}));
    
      setDeck(newDeck);
      setTurns(0);

      displayCards();
  }

  function displayCards() {
    return (
      <div className="gameField">
        {deck.map(card => (
            <Card card={card} key={card.id} clickHandler={handleClick}/>
        ))}
      </div>
    );
  }

  function displayTurns() {
    return (
      <div className="turns">
        Turn: {turns}
      </div>
    );
  }

  function handleClick(card) {
    console.log(card);
  }

  console.log(deck);

  return (
    <div className="App">
      <h1>Underwater world</h1>
      <div className='button' onClick={startGame}>New Game</div>
      {displayTurns()}
      {displayCards()}
    </div>

  );
}

export default App;
