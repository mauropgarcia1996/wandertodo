import React, { FormEvent, useEffect, useState } from "react";
import Todo from "./components/Todo";
import Sidebar from "./components/Sidebar";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebase/config";

interface ITodo {
  name: string;
  description: string;
  done: false;
}

function App() {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    getData();
  }, []);

  const addData = (e: FormEvent) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("todos")
      .add({
        name: name,
        description: description,
        done: false,
      })
      .then((docRef) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const getData = () => {
    const db = firebase.firestore();
    db.collection("todos")
      .get()
      .then((querySnapshot) => {
        const todos: ITodo[] = [];
        querySnapshot.forEach((doc) => {
          todos.push({
            name: doc.data().name,
            description: doc.data().description,
            done: doc.data().done,
          });
        });
        setTodos(todos);
      });
  };
  return (
    <div className="App h-screen flex">
      <Sidebar />
      <div className="h-full w-full flex flex-col justify-center items-center px-20">
        <button onClick={() => setShowModal(!showModal)}>Add Book</button>
        {todos ? (
          todos.map((todo) => (
            <Todo key={todo.name} name={todo.name} description={todo.description} done={todo.done} />
          ))
        ) : (
          <p>No ToDos</p>
        )}
      </div>
      {/* MODALES */}
      <div
        className={`bg-gray-900 opacity-75 w-full h-full absolute object-center flex justify-center items-center ${
          showModal ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute object-center w-full h-full flex justify-center items-center opacity-100 ${
          showModal ? "block" : "hidden"
        }`}
      >
        <div className={`absolute object-center bg-red-400 px-5 py-2 w-5/12 rounded-lg`}>
          <div className="w-100 flex flex-row-reverse">
            <button
              className="w-6 h-6"
              onClick={() => setShowModal(!showModal)}
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
          <form className="flex flex-col" onSubmit={addData}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
