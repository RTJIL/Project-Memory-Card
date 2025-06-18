import { useEffect, useState } from 'react';
import '../styles/Content.css';

export default function Content() {
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const currentScore = clickedCharacters.length;

  useEffect(() => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
  }, [currentScore, bestScore]);

  useEffect(() => {
    (async function fetchImages() {
      const response = await fetch(
        'https://api.jikan.moe/v4/anime/30276/characters',
        { mode: 'cors' }
      );
      const result = await response.json();
      const characters = result.data;

      const shuffled = characters
        .map((char) => ({ sort: Math.random(), value: char.character }))
        .sort((a, b) => a.sort - b.sort)
        .map((item) => item.value)
        .slice(0, 16);

      setCurrentCharacters(shuffled);
    })();
  }, []);

  function shuffleCards() {
    const shuffled = [];
    const usedIndexes = new Set();

    while (shuffled.length < currentCharacters.length) {
      const randomIndex = Math.floor(Math.random() * currentCharacters.length);

      if (!usedIndexes.has(randomIndex)) {
        shuffled.push(currentCharacters[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }

    setCurrentCharacters(shuffled);
  }

  function clickedCharacter(characterName) {
    if (!clickedCharacters.includes(characterName)) {
      setClickedCharacters([...clickedCharacters, characterName]);
    }
    console.log(clickedCharacters);
  }

  function isClicked(name) {
    if (clickedCharacters.includes(name)) {
      setClickedCharacters([]);
      setShowPopup(true);
    }
    return;
  }

  const isWin = () => currentScore === 16;

  /* useEffect(() => {
    console.log('Clicked Characters:', clickedCharacters);
  }, [clickedCharacters]);

  fetch('https://api.jikan.moe/v4/anime/30276/characters', { mode: 'cors' })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .then((data) => {
      data.forEach((char) => {
        console.log('Name:', char.character.name);
        console.log('Image:', char.character.images.jpg.image_url);
        const imageSrc = char.character.images.jpg.image_url;
      });
    })
    .catch((error) => {
      console.log('Failed to fetch characters');
    }); */

  return (
    <div className="content-container">
      <div className="stats-container">
        <div className="score-stat">
          <span className="title">Current Score:</span>
          <span className="counter">{currentScore}</span>
        </div>
        <div className="best-stat">
          <span className="title">Best Score:</span>
          <span className="counter">{bestScore}</span>
        </div>
      </div>

      <div className="cards-container">
        {currentCharacters.map((character) => {
          return (
            <div
              className="card"
              key={character.name}
              onClick={() => {
                shuffleCards(),
                  clickedCharacter(character.name),
                  isClicked(character.name);
              }}
            >
              <img src={character.images.jpg.image_url} />
              <div className="name">{character.name}</div>
            </div>
          );
        })}
      </div>

      <div className={`pop-up-loose ${showPopup ? 'open' : ''}`}>
        <div>Clicked same card twice</div>
        <button onClick={() => setShowPopup(false)}>Try again</button>
      </div>

      <div className={`pop-up-win ${isWin() ? 'open' : ''}`}>
        <button
          onClick={() => {
            setClickedCharacters([]);
            setShowPopup(false); // or maybe you want a separate state for win popup
            shuffleCards();
          }}
        >
          You win, Congrats👍
        </button>
      </div>
      {(showPopup || isWin()) && <div className={`overlay open`}></div>}
    </div>
  );
}
