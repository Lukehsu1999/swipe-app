import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const SwipeableCard = () => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(""); // Track swipe direction

  const [leftSwipes, setLeftSwipes] = useState(0);
  const [rightSwipes, setRightSwipes] = useState(0);

  const cards = [
    { name: "Philosopher's Walk", type: "video", video: "/card_pictures/Kyoto/Philosophers_walk_4.mp4" },
    { name: "Samurai & Ninja Museum", type: "image", img: "/card_pictures/Kyoto/Samurai_ninja_museum_1.jpg" },
    { name: "Samurai & Ninja Museum", type: "image", img: "/card_pictures/Kyoto/Samurai_ninja_museum_2.jpeg" },
    { name: "Nijo Castle", type: "image", img: "/card_pictures/Kyoto/Nijo_castle_1.jpg" },
    { name: "Nijo Castle", type: "image", img: "/card_pictures/Kyoto/Nijo_castle_2.jpg" },
    { name: "Gion", type: "image", img: "/card_pictures/Kyoto/Gion_1.jpg" },
    { name: "Gion", type: "image", img: "/card_pictures/Kyoto/Gion_2.jpg" },
    { name: "Gion", type: "image", img: "/card_pictures/Kyoto/Gion_3.jpg" },
    { name: "Fushimi Inaria Taisha Shrine", type: "image", img: "/card_pictures/Kyoto/Fushimi_Inari_Taisha_Shrine_1.jpg" },
    { name: "Fushimi Inaria Taisha Shrine", type: "image", img: "/card_pictures/Kyoto/Fushimi_Inari_Taisha_Shrine_2.jpg" },
    { name: "Fushimi Inaria Taisha Shrine", type: "image", img: "/card_pictures/Kyoto/Fushimi_Inari_Taisha_Shrine_3.jpg"},
    { name: "Kinkakuji Temple", type: "image", img: "/card_pictures/Kyoto/Kinkakuji_Temple_1.jpg"},
    { name: "Kinkakuji Temple", type: "image", img: "/card_pictures/Kyoto/Kinkakuji_Temple_2.jpg"},
    { name: "Kinkakuji Temple", type: "image", img: "/card_pictures/Kyoto/Kinkakuji_Temple_3.jpg"},
    { name: "Kiyomizu-dera Temple", type: "image", img: "/card_pictures/Kyoto/Kiyomizu_dera_Temple_1.jpg"},
    { name: "Kiyomizu-dera Temple", type: "image", img: "/card_pictures/Kyoto/Kiyomizu_dera_Temple_2.jpg"},
    { name :"Arashiyama", type: "image", img: "/card_pictures/Kyoto/Arashiyama_1.jpg"},
    { name :"Arashiyama", type: "image", img: "/card_pictures/Kyoto/Arashiyama_2.jpg"},
    { name :"Arashiyama", type: "image", img: "/card_pictures/Kyoto/Arashiyama_3.jpg"}
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
          {cards[index].type === "video" ? (
            <video controls width="100%" autoPlay loop>
              <source src={cards[index].video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={cards[index].img} alt={cards[index].name} />
          )}
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
