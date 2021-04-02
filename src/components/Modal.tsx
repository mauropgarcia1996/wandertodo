import React, { FormEvent, useState } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  addData: (e: FormEvent, name: string, description: string) => void;
}
const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div
      className={`w-full h-full absolute object-center ${
        props.showModal ? "block" : "hidden"
      }`}
    >
      <div
        className={`bg-gray-900 opacity-90 w-full h-full absolute object-center flex justify-center items-center ${
          props.showModal ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute object-center w-full h-full flex justify-center items-center opacity-100 ${
          props.showModal ? "block" : "hidden"
        }`}
      >
        <div
          className={`absolute object-center bg-red-400 px-5 py-2 w-8/12 md:w-5/12 rounded-lg`}
        >
          <div className="w-100 flex flex-row-reverse">
            <button
              className="w-6 h-6"
              onClick={() => props.setShowModal(!props.showModal)}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => props.addData(e, name, description)}
          >
            <label className="text-lg font-medium my-1">Name</label>
            <input
              className="px-1 py-1 rounded-lg bg-gray-100 outline-none text-sm"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-lg font-medium my-1">Description</label>
            <textarea
              className="px-1 py-1 rounded-lg bg-gray-100 outline-none text-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-center py-5">
              <button className="w-1/2 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 hover:shadow-md text-gray-50" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
