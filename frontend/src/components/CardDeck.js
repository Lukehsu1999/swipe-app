import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Card from "./Card";
import SwipeResults from "./SwipeResults";
import ItineraryText from "./ItineraryText";
import axios from "axios";
import { normalItineraryPrompt } from "./frontend_prompts";

const CardDeck = ({ cards }) => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(""); // Track swipe direction
  const [leftSwipes, setLeftSwipes] = useState(0);
  const [rightSwipes, setRightSwipes] = useState(0);
  const [likedPlaces, setLikedPlaces] = useState({});
  const [itineraryText, setItineraryText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  const handleSwipe = (direction) => {
    if (index >= cards.length) return; 

    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === "left") setLeftSwipes((prev) => prev + 1);
      if (direction === "right") {
        setRightSwipes((prev) => prev + 1);
        const placeName = cards[index]?.name;
        if (placeName) {
          setLikedPlaces((prev) => ({
            ...prev,
            [placeName]: (prev[placeName] || 0) + 1,
          }));
        }
      }

      if (index < cards.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        setIndex(cards.length); // Trigger summary
      }

      setSwipeDirection(""); // Reset animation
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  const generateItinerary = async () => {
    setIsGenerating(true);
    console.log("Generating itinerary...");
    try {
      const response = await axios.post("https://7ubw6ka6n1.execute-api.us-east-1.amazonaws.com/chat", {
        message: normalItineraryPrompt(JSON.stringify(likedPlaces)),
      });
      setItineraryText(response.data.reply);
      setShowItinerary(true);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setItineraryText("Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div {...handlers} className="card-container">
      {index < cards.length ? (
        <Card card={cards[index]} swipeDirection={swipeDirection} />
      ) : (
        <>
          {!showItinerary && (
            <SwipeResults
              leftSwipes={leftSwipes}
              rightSwipes={rightSwipes}
              likedPlaces={likedPlaces}
              generateItinerary={generateItinerary}
              isGenerating={isGenerating}
            />
          )}
          {showItinerary && <ItineraryText itineraryText={itineraryText} />}
        </>
      )}
    </div>
  );
};

export default CardDeck;
