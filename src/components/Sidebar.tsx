import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`sidebar h-full ${open ? "w-48" : "w-20"}`}>
      <button className="ml-1 mt-1 h-8 w-8" onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar