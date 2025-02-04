import React from "react";

const ItineraryText = ({ itineraryText }) => {
  if (!itineraryText) return <p>No itinerary available.</p>;

  return (
    <div className="itinerary">
      <h3>Generated Itinerary:</h3>
      <p>{itineraryText}</p>
    </div>
  );
};

export default ItineraryText;
