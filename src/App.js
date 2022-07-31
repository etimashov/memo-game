import { useEffect, useState } from 'react';
import { Card } from './components/Card'
import './App.css';
import { ModalMessage } from './components/ModalMessage';

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
  const [disableClicks, setDisableClicks] = useState(false);
  const [matches, setMatches] = useState(0);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    if (firstSelection && secondSelection) {
      //check similarity
      if (firstSelection.src === secondSelection.src) {
        //matched!
        setMatches(matches + 1);
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
        setDisableClicks(true);
        setTimeout(resetSelections, 1000);
        setTimeout((() => setFlipBack(true)), 1000);
      }
      setTurns(turns + 1);
    } // eslint-disable-next-line
  }, [firstSelection, secondSelection]);

  useEffect(() => {
    startGame(); // eslint-disable-next-line
  }, [])
  
  function startGame() {
    let newDeck = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}));
    
      setDeck(newDeck);
      setTurns(0);
      setMatches(0);

      resetSelections();
      setFlipBack(false);

      setModal(true);

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
              disableClicks={disableClicks}
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
    setDisableClicks(false);
  }

function restartGame() {
  setModal(false);
  startGame();
}

  function checkWin() {
    if (matches === (deck.length / 2)) {
      return (
        (modal && <ModalMessage score={turns} message="Click anywhere to start a new game" closeHandler={restartGame} />)
      );
    }
  }

  return (
    <div className="App">
      <h1>Underwater world</h1>
      <div className='button' onClick={startGame}>New Game</div>
      {displayTurns()}
      {displayCards()}
      {checkWin()}
    </div>

  );
}

export default App;
