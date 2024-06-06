import axios from "axios";
import { useRef } from "react";

/* eslint-disable react/prop-types */
const TodoCard = ({ data }) => {
  const title = useRef();
  const description = useRef();
  const handlUpdate = async () => {
    console.log(data);
    console.log(title.current.value, description.current.value);

    const res = await axios.put(
      `http://localhost:3001/api/todo/update/${data?._id}`,
      {
        title: title.current.value,
        description: description.current.value,
      }
    );
  };
  const handleComplete = async () => {
    console.log(data);
    console.log(title.current.value, description.current.value);

    const res = await axios.put(
      `http://localhost:3001/api/todo/update/${data?._id}`,
      {
        completed: true,
      }
    );
  };
  const handleIncomplete = async () => {
    console.log(data);
    console.log(title.current.value, description.current.value);

    const res = await axios.put(
      `http://localhost:3001/api/todo/update/${data?._id}`,
      {
        completed: false,
      }
    );
  };
  const handleRemove = async () => {
    console.log(data);
    console.log(title.current.value, description.current.value);

    const res = await axios.delete(
      `http://localhost:3001/api/todo/delete/${data?._id}`,
      {
        title: title.current.value,
        description: description.current.value,
      }
    );
  };

  return (
    <div className="">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{data?.title}</h2>
          <p>{data?.description}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() =>
                document.getElementById(`my_modal_${data?._id}`).showModal()
              }
              className={data?.completed ? `hidden` : `btn btn-primary`}
            >
              Edit
            </button>

            <dialog id={`my_modal_${data?._id}`} className="modal">
              <div className="modal-box">
                <h2 className="font-bold text-lg">Update Your Todo</h2>
                <div className="flex flex-col gap-5 max-w-96">
                  <input
                    defaultValue={data?.title}
                    ref={title}
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <textarea
                    defaultValue={data?.description}
                    ref={description}
                    className="textarea border-2 border-indigo-600"
                    placeholder="Description"
                  ></textarea>
                  <form method="dialog">
                    <button
                      onClick={() => handlUpdate()}
                      type="submit"
                      className="btn btn-neutral hover:btn-success"
                    >
                      Update Todo
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
            <button
              onClick={() => handleComplete()}
              className={data?.completed ? ` hidden ` : `btn btn-success`}
            >
              Mark as Complete
            </button>
            <button
              onClick={() => handleIncomplete()}
              className={data?.completed ? `btn btn-warning` : `hidden`}
            >
              Mark as Incomplete
            </button>
            <button onClick={() => handleRemove()} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
