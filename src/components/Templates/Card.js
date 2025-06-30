import React from "react";
import { useSelector } from "react-redux";

function Card({
  title,
  description,
  buttonText,
  onButtonClick,
  onEdit,
  onDelete,
  children,
}) {
  const user = useSelector((state) => state.auth.data?.user);
  const canEdit = user?.role === "Admin" || user?.role === "Mentor";
  const canDelete = user?.role === "Admin" || user?.role === "Mentor";

  return (
    <div className="max-w-sm h-60 rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 flex flex-col relative group">
      {(canEdit || canDelete) && (
        <div className="absolute top-2 right-2 flex space-x-3 text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && canEdit && (
            <button
              onClick={onEdit}
              aria-label="Edit"
              className="hover:text-blue-600 dark:hover:text-blue-400 text-lg"
              style={{ lineHeight: 1 }}
            >
              ✏️
            </button>
          )}
          {onDelete && canDelete && (
            <button
              onClick={onDelete}
              aria-label="Delete"
              className="hover:text-red-600 dark:hover:text-red-400 text-lg"
              style={{ lineHeight: 1 }}
            >
              🗑️
            </button>
          )}
        </div>
      )}

      <div className="px-6 py-4 flex-grow">
        <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base overflow-hidden text-ellipsis max-h-24">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

export default Card;
