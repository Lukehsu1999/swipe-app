import React from "react";

const SwipeResults = ({ leftSwipes, rightSwipes, likedPlaces, generateItinerary, isGenerating }) => {
  return (
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
      <button onClick={generateItinerary} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Itinerary"}
      </button>
    </div>
  );
};

export default SwipeResults;
