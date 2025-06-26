import React from "react";

function Input({
  type = "text",
  fields = [],
  required,
  formData,
  onChange,
  readOnly = false,
  ...props
}) {
  return (
    <div className="max-w-sm mx-auto">
      {fields.map((field) => (
        <div className="mb-5" key={field.id}>
          <label
            htmlFor={field.id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {field.label}
          </label>

          <input
            type={field.type || type}
            id={field.id}
            onChange={onChange}
            value={formData[field.id] || ""}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={field.placeholder || ""}
            required={field.required || false}
            readOnly={field.readOnly || false}
            {...props}
          />
        </div>
      ))}
    </div>
  );
}

export default Input;
