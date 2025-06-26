import React from "react";

function Modal({ header, children, onClose }) {
  return (
    <div
      id="authentication-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md max-h-screen overflow-y-auto bg-white dark:bg-gray-700 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {header}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
