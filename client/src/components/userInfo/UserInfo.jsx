import React, { useState } from "react";
import "./userInfo.css";

export default function UserInfo({ field, data }) {
  return (
    <div className="user-info">
      <h4 className="user-info-field">{field}:</h4>
      {field === "Current Modules" ? (
        <div className="module-item-wrapper">
          {data.map((tag, i) => (
            <li className="module-item" key={tag}>
              {tag}
            </li>
          ))}
        </div>
      ) : (
        <h4 className="user-info-data">{data}</h4>
      )}
    </div>
  );
}
