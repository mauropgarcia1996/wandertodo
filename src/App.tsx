import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import Todo from "./components/Todo";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal"

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
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    getData();
  }, []);

  const addData = (e: FormEvent, name: string, description: string) => {
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
            <Todo
              key={todo.name}
              name={todo.name}
              description={todo.description}
              done={todo.done}
            />
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
      {/* MODALES */}
      <Modal showModal={showModal} setShowModal={setShowModal} addData={addData} />
    </div>
  );
}

export default App;
