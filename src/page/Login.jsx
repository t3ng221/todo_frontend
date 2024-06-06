import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const navigate = useNavigate();
  const password = useRef();
  const handleSubmit = async () => {
    console.log("handle clicked");

    const email2 = email.current.value;
    const password2 = password.current.value;
    try {
      const res = await axios.post("http://localhost:3001/api/users/login", {
        email: email2,
        password: password2,
      });
      console.log(res);
      console.log(res.data.data.email);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={email}
                  type="email"
                  placeholder="email"
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
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  onClick={() => handleSubmit()}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
