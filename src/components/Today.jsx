import React, { useEffect, useState } from "react";
import "./Today.css";

const Today = ({ currentUser }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const saved = JSON.parse(localStorage.getItem("selectedDates")) || {};
    const userDates = saved[currentUser] || [];

    if (userDates.length === 0) {
      setStatus("No period data logged yet.");
      return;
    }

    // Find the last marked period start date
    const dateObjects = userDates.map(d => new Date(d));
    dateObjects.sort((a, b) => b - a);
    const lastPeriodStart = dateObjects[0];

    const today = new Date();
    const diffDays =
      Math.floor((today - lastPeriodStart) / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays === 1) {
      setStatus("Period may start today");
    } else if (diffDays > 1 && diffDays <= 5) {
      setStatus(`Day ${diffDays} of your period`);
    } else {
      setStatus(`Cycle Day ${diffDays}`);
    }
  }, [currentUser]);

  return (
    <div className="today-container">
      <div className="status-box">
        <h2>{status}</h2>
        <button className="log-btn">Log period</button>
      </div>

      <div className="symptom-box">
        <h3>My daily insights · Today</h3>
        <div className="cards">
          <div className="card">Log your symptoms ➕</div>
          <div className="card">Stormy mood? Find out why 🌈</div>
          <div className="card">Today’s chance of pregnancy 💡</div>
        </div>
      </div>
    </div>
  );
};

export default Today;
