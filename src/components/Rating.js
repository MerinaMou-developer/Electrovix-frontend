import React from "react";

function Rating({ value, text, color = "#455A64" }) {
  return (
    <div className="rating flex items-center gap-1 flex-wrap">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <i
            style={{ color }}
            className={
              value >= star
                ? "fas fa-star"
                : value >= star - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
      ))}
      {text && <span className="text-muted text-sm ml-1">{text}</span>}
    </div>
  );
}

export default Rating;
