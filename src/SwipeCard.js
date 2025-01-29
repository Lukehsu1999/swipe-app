import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const SwipeableCard = () => {
  const [index, setIndex] = useState(0);
  const cards = [
    { name: "Apple", img: "https://via.placeholder.com/200" },
    { name: "Banana", img: "https://via.placeholder.com/200" },
    { name: "Cherry", img: "https://via.placeholder.com/200" }
  ];

  const handleSwipe = (direction) => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true, // ✅ Enables swiping with mouse
  });

  return (
    <div {...handlers} className="card-container">
      {index < cards.length ? (
        <div className="card">
          <img src={cards[index].img} alt={cards[index].name} />
          <h3>{cards[index].name}</h3>
        </div>
      ) : (
        <h3>No more cards!</h3>
      )}
    </div>
  );
};

export default SwipeableCard;
