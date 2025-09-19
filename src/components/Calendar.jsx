import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = ({ currentUser }) => {
  const today = new Date();
  const startYear = 2025;
  const endYear = startYear + 5;

  const [selectedDates, setSelectedDates] = useState(null); // null means "not loaded yet"

  // Determine user key
  const userKey = currentUser || "anonymous";

  // Load selectedDates from localStorage once
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("selectedDates") || "{}");
    setSelectedDates(saved[userKey] || []);
  }, [userKey]);

  // Save selectedDates to localStorage whenever they change
  useEffect(() => {
    if (selectedDates === null) return; // don't save before loading

    const saved = JSON.parse(localStorage.getItem("selectedDates") || "{}");
    saved[userKey] = selectedDates;
    localStorage.setItem("selectedDates", JSON.stringify(saved));
  }, [selectedDates, userKey]);

  // Wait until selectedDates are loaded
  if (selectedDates === null) return null;

  const formatDate = (y, m, d) => new Date(y, m, d).toISOString().split("T")[0];

  const toggleDate = (y, m, d) => {
    const f = formatDate(y, m, d);
    setSelectedDates(prev =>
      prev.includes(f) ? prev.filter(d => d !== f) : [...prev, f]
    );
  };

  const renderMonth = (y, m) => {
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(y, m, 1).getDay();
    const monthName = new Date(y, m).toLocaleString("default", { month: "long" });

    const days = [];
    for (let i = 0; i < firstDay; i++)
      days.push(<div key={`empty-${i}`} className="day empty" />);

    for (let i = 1; i <= daysInMonth; i++) {
      const f = formatDate(y, m, i);
      const isSelected = selectedDates.includes(f);
      const isToday =
        today.getFullYear() === y &&
        today.getMonth() === m &&
        today.getDate() === i;

      days.push(
        <div
          key={f}
          className={`day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
          onClick={() => toggleDate(y, m, i)}
        >
          {i}
        </div>
      );
    }

    return (
      <div key={`${y}-${m}`} className="month-card">
        <h4>{monthName} {y}</h4>
        <div className="days-grid">{days}</div>
      </div>
    );
  };

  const months = [];
  for (let y = startYear; y < endYear; y++)
    for (let m = 0; m < 12; m++)
      months.push(renderMonth(y, m));

  return <div className="calendar-container">{months}</div>;
};

export default Calendar;
