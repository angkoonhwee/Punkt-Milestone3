import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./loading.css";

export default function Loading() {
  return (
    <div className="container-loading">
      <div className="loading-wrapper">
        <h1 className="loading-text">Loading</h1>
        <PacmanLoader color={"#489FB5"} size={60} />
      </div>
    </div>
  );
}