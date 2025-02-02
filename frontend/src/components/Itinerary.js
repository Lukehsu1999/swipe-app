import React from "react";

const Itinerary = ({ itinerary }) => {
  if (!itinerary || typeof itinerary !== "object") return <p>No itinerary available.</p>;

  return (
    <div className="itinerary">
      <h3>Generated Itinerary:</h3>
      {Object.entries(itinerary).map(([day, sessions]) => (
        <div key={day} className="day">
          <h4>{day}</h4>
          {Object.entries(sessions).map(([session, places]) => (
            <div key={session} className="session">
              <h5>{session.charAt(0).toUpperCase() + session.slice(1)} Plan</h5>
              <ul>
                {places.map((activity, i) => (
                  <li key={i}>
                    <strong>{activity.time} - {activity.place}</strong>: {activity.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
