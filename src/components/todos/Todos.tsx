import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Modal from "../Modal"
import { db } from "../../firebase/config";

interface ITodo {
  name: string;
  description: string;
  done: false;
}

const Todos: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
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

  const addData = (e: React.FormEvent, name: string, description: string) => {
    e.preventDefault();
    db.collection("todos")
      .add({
        name: name,
        description: description,
        done: false,
      })
      .then((docRef) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-20">
      <button onClick={() => setShowModal(!showModal)}>Add ToDo</button>
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
      {/* MODALES */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        addData={addData}
      />
    </div>
  );
};

export default Todos;
