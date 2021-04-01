import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Modal from "../Modal"
import { db } from "../../firebase/config";
import loaderIcon from "../../assets/icons/loader.svg"

interface ITodo {
  id: string;
  name: string;
  description: string;
  done: false;
}

const Todos: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
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
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            done: doc.data().done,
          });
        });
        setTodos(todos);
        setLoading(false)
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
        console.log(docRef)
        getData();
        setShowModal(!showModal)
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const completeTodo = (id: string, done: boolean) => {
    setLoading(true)
    db.collection("todos").doc(id).update({done: !done})
    .then(() => {
      console.log('Doc Updated')
      getData();
    })
    .catch((err) => {
      console.log(err);
      
    })
  }

  const deleteTodo = (id: string) => {
    setLoading(true)
    db.collection("todos").doc(id).delete()
    .then(() => {
      console.log('Doc Deleted')
      getData();
    })
    .catch((err) => {
      console.log(err);
      
    })
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-2 sm:px-20">
      <button onClick={() => setShowModal(!showModal)}>Add ToDo</button>
      {!loading && todos ? (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            name={todo.name}
            description={todo.description}
            done={todo.done}
            completeTodo={() => completeTodo(todo.id, todo.done)}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))
      ) : (
        <p>{loading ? <img className="animate-spin spin-slow" src={loaderIcon} /> : 'No Data'}</p>
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
