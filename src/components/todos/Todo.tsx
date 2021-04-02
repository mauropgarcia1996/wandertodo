import React from "react";

interface ItemProps {
  name: string;
  description: string;
  done: boolean;
  completeTodo: () => void;
  deleteTodo: () => void;
}

const Todo: React.FunctionComponent<ItemProps> = (props: ItemProps) => {
  return (
    <div className="todo-item grid grid-cols-12 w-full lg:max-w-3xl py-2 h-16 rounded-3xl shadow-lg my-2 transform duration-300 sm:hover:scale-105">
      <div className="col-span-2 flex justify-center items-center">
        <div className="h-4 w-4 sm:h-8 sm:w-8">
          {props.done ? (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="col-span-10 grid grid-cols-12">
        <div className="col-span-6 sm:col-span-8">
          <p
            className={`sm:text-xl font-medium cursor-pointer hover:line-through ${
              props.done ? "line-through" : ""
            }`}
            onClick={props.completeTodo}
          >
            {props.name}
          </p>
          <p className={`text-xs ${props.done ? "line-through" : ""}`}>
            {props.description}
          </p>
        </div>
        <div className="col-span-6 px-4 sm:col-span-4">
          <div className="flex items-center justify-between sm:mx-4">
            <p className="font-medium text-xs">12/03/2021</p>
            <div className="h-4 w-4 md:mx-2">
              <svg
                className="cursor-pointer h-4 w-4"
                onClick={props.deleteTodo}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
