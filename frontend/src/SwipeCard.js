import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

const SwipeableCard = ({cards}) => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(""); // Track swipe direction

  const [leftSwipes, setLeftSwipes] = useState(0);
  const [rightSwipes, setRightSwipes] = useState(0);

  const [likedPlaces, setLikedPlaces] = useState([]); // Track liked places
  const [itinerary, setItinerary] = useState(""); // Store generated itinerary

  const [isGenerating, setIsGenerating] = useState(false); // Track button state


  const handleSwipe = (direction) => {
    if (index >= cards.length) return; 
    
    setSwipeDirection(direction); // Set the direction for animation

    setTimeout(() => {
      if (direction === "left") setLeftSwipes(leftSwipes + 1);
      if (direction === "right") {
        setRightSwipes(rightSwipes + 1);
        setLikedPlaces((prevLikedPlaces) => [...prevLikedPlaces, cards[index].name]);
      }

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

  // ✅ Fixed generate_itinerary function
  const generate_itinerary = async () => {
    setIsGenerating(true); // Disable button while generating
    console.log("Generating itinerary...");
    try {
      const response = await axios.post("http://localhost:5001/chat", {
        message: `Generate a two-day trip plan in Kyoto based on these places: ${likedPlaces.join(", ")}`,
      });

      setItinerary(response.data.reply); // Store response in state
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setItinerary("Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false); // Enable button after generating
    }
  };

  return (
    <div {...handlers} className="card-container">
      {index < cards.length && index < cards.length? (
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
          <h4>Liked Places:</h4>
          <ul>
            {likedPlaces.map((place, i) => (
              <li key={i}>{place}</li>
            ))}
          </ul>
          <button onClick={() => generate_itinerary()} disabled={isGenerating}>
           {isGenerating ? "Generating..." : "Generate Itinerary"}
          </button>
          {itinerary && (
            <div className="itinerary">
              <h3>Generated Itinerary:</h3>
              <p>{itinerary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SwipeableCard;
