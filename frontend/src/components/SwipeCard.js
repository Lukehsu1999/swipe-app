import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import SwipeResults from "./SwipeResults";
import Itinerary from "./Itinerary";
import ItineraryText from "./ItineraryText";
import axios from "axios";
import { formattedItineraryPrompt, normalItineraryPrompt, chineseItineraryPrompt } from "./frontend_prompts";

const SwipeableCard = ({cards}) => {
  const [index, setIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(""); // Track swipe direction

  const [leftSwipes, setLeftSwipes] = useState(0);
  const [rightSwipes, setRightSwipes] = useState(0);

  const [likedPlaces, setLikedPlaces] = useState({}); // Track liked places
  const [itinerary, setItinerary] = useState({}); // Store generated itinerary
  const [itineraryText, setItineraryText] = useState(""); // Store generated itinerary text

  const [isGenerating, setIsGenerating] = useState(false); // Track button state
  const [showItinerary, setShowItinerary] = useState(false);


  const handleSwipe = (direction) => {
    if (index >= cards.length) return; 
    
    setSwipeDirection(direction); // Set the direction for animation

    setTimeout(() => {
      if (direction === "left") setLeftSwipes(leftSwipes + 1);
      if (direction === "right") {
        setRightSwipes(rightSwipes + 1);
        const placeName = cards[index]?.name;
        if (placeName) {
          setLikedPlaces((prevLikedPlaces) => ({
            ...prevLikedPlaces,
            [placeName]: (prevLikedPlaces[placeName] || 0) + 1, 
          }));
        }
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
      const response = await axios.post("https://7ubw6ka6n1.execute-api.us-east-1.amazonaws.com/chat", {
        // message: `Generate a two-day trip plan in Kyoto based on these places
        // The user has prioritized these places as follows (higher values mean higher priority), keep it brief: 
        // ${JSON.stringify(likedPlaces)}}`,
        message: normalItineraryPrompt(JSON.stringify(likedPlaces)),
      });
      const rawData = response.data.reply;
      setItineraryText(rawData); // Store response in state
      //const parsedItinerary = JSON.parse(rawData);
      //setItinerary(parsedItinerary); // Store response in state
      setShowItinerary(true); 
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
        <>
         {!showItinerary && (
            <SwipeResults
              leftSwipes={leftSwipes}
              rightSwipes={rightSwipes}
              likedPlaces={likedPlaces}
              generateItinerary={generate_itinerary}
              isGenerating={isGenerating}
            />
         )}
          {/* {showItinerary && itinerary && (
            <Itinerary itinerary={itinerary} />
          )} */}
          {showItinerary && itinerary && (
            <ItineraryText itineraryText={itineraryText} />
          )}
          </>
      )}
    </div>
  );
};

export default SwipeableCard;
