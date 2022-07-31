import { useEffect, useState } from 'react';
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
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [flipBack, setFlipBack] = useState(false);

  useEffect(() => {
    if (firstSelection && secondSelection) {
      //check similarity
      if (firstSelection.src === secondSelection.src) {
        //matched!
        let newDeck = deck.map((card) => {
          if (card.id === firstSelection.id || card.id === secondSelection.id) {
            let newCard = card;
            newCard.matched = true;
            return newCard;
          }
          else {
            return card;
          }
        });

        setDeck(newDeck);
        resetSelections();
      }
      else {
        //no match
        setTimeout(resetSelections, 1000);
        setTimeout((() => setFlipBack(true)), 1000);
      }
    }
  }, [firstSelection, secondSelection, deck]);

  
  function startGame() {
    let newDeck = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}));
    
      setDeck(newDeck);
      setTurns(0);

      resetSelections();
      setFlipBack(false);

      displayCards();
  }

  function displayCards() {
    return (
      <div className="gameField">
        {deck.map(card => (
            <Card 
              card={card} 
              key={card.id} 
              clickHandler={clickOnCard}
              flipBack={flipBack}
            />
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

  function clickOnCard(card) {
    if (!firstSelection) {
      setFirstSelection(card);
      setFlipBack(false);
    } else {
      setSecondSelection(card);
    }
  }

  function resetSelections() {
    setFirstSelection(null);
    setSecondSelection(null);
  }

  //console.log(deck);

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
