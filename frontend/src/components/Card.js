import React, { useState } from "react";

const Card = ({ card, swipeDirection }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`card ${swipeDirection}`} key={card.name}>
      {card.type === "video" ? (
        <video controls width="100%" autoPlay loop>
          <source src={card.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={card.img} alt={card.name} />
      )}
      <h3>{card.name}</h3>

      {/* Toggle Description & Arrow */}
      {card.description && (
        <>
          <button onClick={toggleDescription} className="toggle-btn">
            {expanded ? "⬆️" : "⬇️"}
          </button>
          {expanded && <p className="description">{card.description}</p>}
        </>
      )}
    </div>
  );
};

export default Card;
