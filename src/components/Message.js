import React from "react";

function Message({ variant = "info", children }) {
  const styles = {
    danger: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };
  return (
    <div className={`p-4 rounded-xl border ${styles[variant] || styles.info} text-sm font-medium`}>
      {children}
    </div>
  );
}

export default Message;
