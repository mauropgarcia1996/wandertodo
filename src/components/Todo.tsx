import React from "react";

interface ItemProps {
  name: string;
  done: boolean;
}

const Todo = (props: ItemProps) => {
  return (
    <div className="todo-item grid grid-cols-12 w-full py-2 rounded-3xl shadow-lg my-2">
      <div className="col-span-2 flex justify-center items-center">
        <div className="h-8 w-8">
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
        <div className="col-span-10">
          <p className="text-xl font-medium">{props.name}</p>
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat
            quis id sit ac feugiat quis nec amet. Vel donec nulla mi
            pellentesque pharetra a. Molestie suscipit et pellentesque hac eu.
            Ullamcorper consequat, justo, pellentesque nec fermentum aliquam
            morbi. Enim risus sed vulputate vulputate eget risus aliquet.
            Suspendisse.
          </p>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-between mx-4">
            <p className="font-medium text-xs">12/03/2021</p>
            <div className="h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo
