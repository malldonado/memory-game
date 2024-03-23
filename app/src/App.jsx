import "./App.css";
import Images from "./Images";
import { useState } from "react";
import { shuffle } from "lodash";

function App() {
  const [cards, setCards] = useState(() => shuffle([...Images, ...Images]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);

  function flipCard(index) {
    if(won) {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
    }
    if (activeCards.length === 0 || activeCards.length === 2) {
      setActiveCards([index]);
    } else if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;
      if (cards[firstIndex] === cards[secondIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
        setFoundPairs([...foundPairs, firstIndex, secondIndex]);
      }
      setActiveCards([...activeCards, index]);
    }
    setClicks(clicks + 1);
  }

  return (
    <div className="main">
      <div className="board-main">
        <div className="board">
          {cards.map((card, index) => {
            const flippedToFront =
              activeCards.includes(index) || foundPairs.includes(index);
            return (
              <div
                className={"card-outer " + (flippedToFront ? "flipped" : "")}
                onClick={() => flipCard(index)}
                key={index}
              >
                <div className="card">
                  <div className="front">
                    <img src={card} alt="" />
                  </div>
                  <div className="back" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="clicks-main">
        {won && (
          <>
            You won the game! Congratulations! <br />
          </>
        )}
        <span className="clicks">
          CLICKS: {clicks}
          <br/>
          <br/>
          Found pairs: {foundPairs.length / 2}
        </span>
      </div>
    </div>
  );
}

export default App;
