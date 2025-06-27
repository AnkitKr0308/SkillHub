import React from "react";

function Card({ title, description, buttonText, onButtonClick, children }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 flex flex-col h-60">
      {/* h-72 sets fixed height; adjust as needed */}

      <div className="px-6 py-4 flex-grow">
        <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base overflow-hidden text-ellipsis max-h-24">
          {description}
        </p>
      </div>
      {children}

      {/* {showButton && (
        <div className="px-6 py-4">
          <button
            onClick={onButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            {buttonText}
          </button>
        </div>
      )} */}
    </div>
  );
}

export default Card;
