import React from "react";

function Card({ title, description, buttonText, onButtonClick }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={onButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Card;
