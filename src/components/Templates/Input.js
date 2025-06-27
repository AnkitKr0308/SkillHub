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
    <div className="max-w-full mx-auto space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="flex items-start gap-4 flex-wrap">
          <label
            htmlFor={field.id}
            className="min-w-[100px] text-sm font-semibold text-gray-700 dark:text-gray-200 pt-3 flex justify-start"
          >
            {field.label}
          </label>

          <div className="flex-1">
            {field.type?.toLowerCase() === "url" && field.readOnly ? (
              <a
                href={formData[field.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-words"
              >
                {formData[field.id]}
              </a>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.id}
                onChange={onChange}
                value={formData[field.id] || ""}
                className="w-full resize-none p-3 border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder || ""}
                required={field.required || false}
                readOnly={field.readOnly || false}
                rows={4}
                {...props}
              />
            ) : (
              <input
                type={field.type || type}
                id={field.id}
                onChange={onChange}
                value={formData[field.id] || ""}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder || ""}
                required={field.required || false}
                readOnly={field.readOnly || false}
                {...props}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Input;
