import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const SwipeableCard = () => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(""); // Track swipe direction

  const [leftSwipes, setLeftSwipes] = useState(0);
  const [rightSwipes, setRightSwipes] = useState(0);

  const cards = [
    { name: "Apple", img: "https://via.placeholder.com/200" },
    { name: "Banana", img: "https://via.placeholder.com/200" },
    { name: "Cherry", img: "https://via.placeholder.com/200" }
  ];

  const handleSwipe = (direction) => {
    setSwipeDirection(direction); // Set the direction for animation

    setTimeout(() => {
      if (direction === "left") setLeftSwipes(leftSwipes + 1);
      if (direction === "right") setRightSwipes(rightSwipes + 1);

      if (index < cards.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(cards.length); // Trigger summary
      }

      setSwipeDirection(""); // Reset animation
    }, 300); // Delay removal for animation effect
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  return (
    <div {...handlers} className="card-container">
      {index < cards.length ? (
        <div className={`card ${swipeDirection}`} key={cards[index].name}>
          <img src={cards[index].img} alt={cards[index].name} />
          <h3>{cards[index].name}</h3>
        </div>
      ) : (
        <div className="summary">
          <h3>Summary</h3>
          <p>👈 Swiped Left: {leftSwipes}</p>
          <p>👉 Swiped Right: {rightSwipes}</p>
        </div>
      )}
    </div>
  );
};

export default SwipeableCard;
