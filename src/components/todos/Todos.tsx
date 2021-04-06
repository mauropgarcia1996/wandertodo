import React, { useState, useEffect, useContext } from "react";
import Todo from "./Todo";
import Modal from "../Modal";
import { db } from "../../firebase/config";
import loaderIcon from "../../assets/icons/loader.svg";
import AuthContext from "../../context/authContext/AuthContext";

interface ITodo {
  id: string;
  name: string;
  description: string;
  done: false;
}

const Todos: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    db.collection("todos")
      .where("user", "==", authContext.user?.uuid)
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
        setLoading(false);
      });
  };

  const addData = (e: React.FormEvent, name: string, description: string) => {
    e.preventDefault();
    db.collection("todos")
      .add({
        user: authContext.user?.uuid,
        name: name,
        description: description,
        done: false,
      })
      .then((docRef) => {
        console.log(docRef);
        getData();
        setShowModal(!showModal);
      })
      .catch((err) => console.log(err));
  };

  const completeTodo = (id: string, done: boolean) => {
    setLoading(true);
    db.collection("todos")
      .doc(id)
      .update({ done: !done })
      .then(() => {
        console.log("Doc Updated");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (id: string) => {
    setLoading(true);
    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Doc Deleted");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-2 sm:px-20">
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
        <p>
          {loading ? (
            <img
              className="animate-spin spin-slow"
              alt="loader-icon"
              src={loaderIcon}
            />
          ) : (
            "No Data"
          )}
        </p>
      )}
      <button onClick={() => setShowModal(!showModal)}>
        <svg
          className="h-8 w-8 my-2 hover:text-indigo-800 transform hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
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
