import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", user, { withCredentials: true })
      .then((response) => {
        console.log("userRegistered", response.data);
        navigate("/posts");
      })
      .catch((err) => {
        console("error while registering the new user in client", err);
      });
  };
  const { userName, email, password, confirmPassword } = user;
  return (
    <div className="body">
      <section className="register py-5 bg-light">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-5">
              <img
                alt="initial image"
                src="https://thumbs.dreamstime.com/b/internet-information-technology-businessman-hand-showing-concept-75784736.jpg"
                // src="https://dailytimes.com.pk/assets/uploads/2022/02/25/Best-Free-Online-Information-Technology-Courses.jpg"
                height="600"
                width="600"
                // className="img-fluid"
              />
            </div>
            <div className="col-lg-7 text-center pb-3 pt-4 ">
              <h1 className="text-light">Techgram</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-row py-3 pt-3 ">
                  <div className=" offset-1 col-lg-10 ">
                    <input
                      type="text"
                      className="inp  px-4"
                      name="userName"
                      placeholder="Username"
                      value={userName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="text"
                      className="inp px-4"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="password"
                      className="inp  px-4"
                      placeholder="Password"
                      value={password}
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="password"
                      className="inp px-4"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row  py-4">
                  <div className="offset-1 col-lg-10">
                    <button className="btn1">Sign Up</button>
                  </div>
                </div>
              </form>
              <div className="">
                Have an account ? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
