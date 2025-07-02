import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dropdown({ label, items = [], selectable = false, onSelect, selectedValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, SetSelectedLabel] = useState(label);

  useEffect(() => {
  if (selectedValue) {
    const match = items.find((item) => item.value === selectedValue);
    if (match) {
      SetSelectedLabel(match.label);
    }
  } else {
    SetSelectedLabel(label); 
  }
}, [selectedValue, items, label]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (item) => {
    SetSelectedLabel(item.label);
    setIsOpen(false);
    if (selectable && onSelect) {
      onSelect(item.value);
    }
  };

  return (
    <div className="relative inline-block w-56">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedLabel}
        <span className="ml-2 text-gray-500">&#9662;</span>{" "}
        
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto">
            {items.map((item, idx) => (
              <li key={idx}>
                {selectable ? (
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleSelect(item)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
