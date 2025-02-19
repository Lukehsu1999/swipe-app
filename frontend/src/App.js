import React from "react";
import SwipeCard from "./components/SwipeCard";
import CardDeck from "./components/CardDeck";
import allCards from "./cardData";
import "./App.css";

// Function to shuffle and pick 10 random cards
const getRandomCards = (num) => {
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

function App() {
  const selectedCards = getRandomCards(10);
  return (
    <div>
      <h1>Swipe App</h1>
      <CardDeck cards={selectedCards}/>
    </div>
  );
}

export default App;