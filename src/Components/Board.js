import { useState, useEffect } from "react";
import Card from "./Cards";
import { shuffle } from "../utilities/shuffle";

const dogs = ["/dogs/Dog1.jpg", "/dogs/Dog2.jpg"];
const dogsDoubled = shuffle([...dogs, ...dogs]);

export default function Board() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [foundCards, setFoundCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const flippedImages = flippedCards.map((idx) => {
        return dogsDoubled[idx];
      });
      const doTheyMatch = flippedImages[0] === flippedImages[1];
      if (doTheyMatch) {
        setFoundCards([...foundCards, ...flippedCards]);
        setFlippedCards ([]);
      } else {
        setTimeout(() => {
        setFlippedCards ([]);
        }, 3000);
      }
    }
  });

  function flipCard(index) {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {dogsDoubled.map((src, idx) => (
        <Card
          key="idx"
          image={src}
          isFlipped={flippedCards.includes(idx) || foundCards.includes(idx) }
          click={() => {
            flipCard(idx);
          }}
        />
      ))}
      <div></div>
    </div>
  );
}
