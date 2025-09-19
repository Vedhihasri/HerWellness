import React from "react";
import { useNavigate } from "react-router-dom";
import insightsData from "./insights.json";
import "./insights.css";

export default function Insights() {
  const navigate = useNavigate();

  return (
    <div className="insights-container">
      <h1 className="page-title">Wellness Insights</h1>
      <div className="insights-row">
        {insightsData.map((item) => (
          <div
            key={item.id}
            className="insight-card"
            onClick={() => navigate(`/article/${item.id}`)}
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
