import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8000/login", user, {
        withCredentials: true,
      });
      console.log("user Logged in ", response.data);
      if (response.data) {
        navigate("/posts");
      }
    } catch (err) {
      console.log("err while logging in the user in client", err);
    }
  };
  return (
    <div className="body">
      <section className="login py-5 bg-light">
        <div className="container">
          <div className="row g-0">
            <div className="img col-lg-5 "></div>
            <div className="col-lg-7 text-center py-5">
              <h1>Techgram</h1>

              <form onClick={handleSubmit}>
                <div className="form-row py-3 pt-5">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="text"
                      className="inp px-4"
                      placeholder="Email"
                      onChange={handleChange}
                      name="email"
                      value={email}
                    />
                  </div>
                </div>
                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="password"
                      className="inp  px-4"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={password}
                    />
                  </div>
                </div>
                <div className="form-row  py-4">
                  <div className="offset-1 col-lg-10">
                    <button className="btn1">Login</button>
                  </div>
                </div>
              </form>
              <div className="">
                Don't have an account ? <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
