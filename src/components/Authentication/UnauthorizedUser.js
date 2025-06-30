import React from "react";

function UnauthorizedUser() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}

export default UnauthorizedUser;
