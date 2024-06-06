import axios from "axios";
import { useRef } from "react";

const Register = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async () => {
    console.log("handle clicked");
    const name2 = name.current.value;
    const email2 = email.current.value;
    const password2 = password.current.value;
    try {
      const res = await axios.post("http://localhost:3001/api/users/register", {
        name: name2,
        email: email2,
        password: password2,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  ref={name}
                  type="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={email}
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  ref={password}
                  type="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  onClick={() => handleSubmit()}
                  className="btn btn-primary"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
