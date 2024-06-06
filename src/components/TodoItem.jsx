import axios from "axios";
import { useRef } from "react";

const TodoItem = () => {
  const title = useRef();
  const description = useRef();

  const handleSubmit = async () => {
    console.log("handle clicked");
    const title2 = title.current.value;
    const des2 = description.current.value;
    try {
      const res = await axios.post("http://localhost:3001/api/todo/add", {
        title: title2,
        description: des2,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add ToDo
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h2 className="font-bold text-lg">Add Your Todo</h2>
          <label className="input input-bordered flex items-center gap-2">
            Title
            <input type="text" className="grow" placeholder="Title" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <input type="text" className="grow" placeholder="Todo Details" />
          </label>
          <div className="modal-action">
            <div method="dialog">
              <button onClick={() => handleSubmit()} className="btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TodoItem;
