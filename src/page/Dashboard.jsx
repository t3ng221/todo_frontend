/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react";
import TodoCard from "../components/TodoCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/todo/alltodo")
      .then((res) => setTodos(res.data.data))
      .catch((error) => console.log(error));
  }, [todos]);

  const title = useRef();
  const description = useRef();

  const handleAddTodo = async () => {
    const title2 = title.current.value;
    const des2 = description.current.value;
    console.log("handle clicked", title2, des2);
    try {
      const res = await axios.post("http://localhost:3001/api/todo/add", {
        title: title2,
        description: des2,
      });
      console.log(res);
      const updatedTodos = await axios.get(
        "http://localhost:3001/api/todo/alltodo"
      );
      setTodos(updatedTodos.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };
  const id = localStorage.getItem("id");
  return (
    <div>
      <h2 className="text-center text-5xl">ToDo APP</h2>

      <div className="flex justify-center">
        {/* Add ToDo Button */}
        <button
          className="btn bg-primary text-black hover:text-white my-5"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add ToDo
        </button>
        <button
          onClick={() => handleLogout()}
          className="btn btn-error absolute right-5 top-5"
        >
          Logout
        </button>
        {/* Modal Opens Here */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Add Your Todo</h2>
            <div className="flex flex-col gap-5 max-w-96">
              <input
                ref={title}
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
              />
              <textarea
                ref={description}
                className="textarea border-2 border-indigo-600"
                placeholder="Description"
              ></textarea>
              <form method="dialog">
                {/* Add ToDo DB */}
                <button
                  onClick={() => handleAddTodo()}
                  type="submit"
                  className="btn btn-neutral hover:btn-success"
                >
                  ADD Todo
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-warning">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <h2 className="text-2xl text-center">Pending Task</h2>
      <div className="border-t-2 border-indigo-600 mt-5 grid grid-cols-3 gap-3 py-5 px-5">
        {todos
          ?.filter((each) => each.userId === id && each.completed === false)
          .map((each) => (
            <TodoCard data={each} key={each._id} />
          ))}
      </div>
      <h2 className="text-2xl text-center">Completed Task List</h2>
      <div className="border-t-2 border-indigo-600 mt-5 grid grid-cols-3 gap-3 py-5 px-5">
        {todos
          ?.filter((each) => each.userId === id && each.completed === true)
          .map((each) => (
            <TodoCard data={each} key={each._id} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
