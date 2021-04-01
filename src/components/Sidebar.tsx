import React, { useState } from "react";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FunctionComponent<SidebarProps> = (
  props: SidebarProps
) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`sidebar flex flex-col items-center h-full ${
        open ? "w-20 sm:w-48" : "w-16 sm:w-20"
      }`}
    >
      <button
        className="w-full flex justify-end mb-10 mt-2 outline-none"
        onClick={() => setOpen(!open)}
      >
        <div className="h-8 w-8 mx-5">
          {open ? (
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </button>
      {props.children}
    </div>
  );
};

export default Sidebar;
