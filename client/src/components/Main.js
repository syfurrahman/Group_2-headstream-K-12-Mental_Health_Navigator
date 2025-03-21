import React from "react";
import "../styles.css";

const Main = () => {
  return (
    <div className="main-container">
      {/* Background Image */}
      <div className="main-background"></div>

      {/* Text Overlay */}
      <div className="main-content">
        <h1>
          A guide to choosing and using digital interventions for student well-being
        </h1>
        <p>
          The K-12 Mental Health Tech Navigator is here to help schools and districts choose and use effective digital tools for student mental health and well-being.
        </p>

        {/* Chat Button */}
        <button className="floating-chat-button" onClick={() => alert("Chat coming soon!")}>
          💬
        </button>

      </div>
    </div>
  );
};

export default Main;
