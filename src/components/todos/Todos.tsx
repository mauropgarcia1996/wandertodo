import React, { useState, useEffect, useContext } from "react";
import Todo from "./Todo";
import { db } from "../../firebase/config";
import loaderIcon from "../../assets/icons/loader.svg";
import AuthContext from "../../context/authContext/AuthContext";
import Modal from "react-modal";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(window.location.pathname)
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
    <div className="w-full flex flex-col justify-center items-center px-2 sm:px-20">
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
      <button className="outline-none border-none focus:outline-none" onClick={() => setShowModal(!showModal)}>
        <svg
          className="h-8 w-8 my-2 text-red-400 hover:text-red-500 transform hover:scale-105"
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
      <Modal
        isOpen={showModal}
        style={{
          overlay: { backgroundColor: "#272731" },
          content: {
            left: "30%",
            top: "25%",
            backgroundColor: "#18181f",
            color: "white",
            border: "none",
            borderRadius: "15px",
            maxWidth: "600px",
            maxHeight: "300px"
          },
        }}
        contentLabel="Add ToDo"
        onRequestClose={() => setShowModal(!showModal)}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full flex justify-end">
          <button onClick={() => setShowModal(!showModal)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="w-full flex justify-center">
          <form
            className="flex flex-col w-3/4"
            onSubmit={(e) => addData(e, name, description)}
          >
            <label className="text-lg font-medium my-1">Name</label>
            <input
              className="px-1 py-1 rounded-lg bg-gray-100 outline-none text-sm text-gray-900"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-lg font-medium my-1">Description</label>
            <textarea
              className="px-1 py-1 rounded-lg bg-gray-100 outline-none text-sm text-gray-900"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-center py-5">
              <button
                className="w-1/2 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 hover:shadow-md text-gray-50"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Todos;
