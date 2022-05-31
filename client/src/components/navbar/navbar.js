import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userToken = Cookies.get("userToken");
  useEffect(() => {
    if (userToken) {
      const user = jwtDecode(userToken);
      console.log("user", user);
      setUser(user);
      navigate("/posts");
    }
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout", {}, { withCredentials: true })
      .then((response) => {
        console.log("succfully logged out", response.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log("error while logging out", err);
      });
  };
  return (
    <>
      <div className="row justify-content-center pt-1 pb-3 navbar">
        <div className="col-5 mt-2 d-flex">
          <h1 className="icon px-4">Techgram</h1>
          <form>
            <input
              type="text"
              placeholder="search"
              className="px-3 py-2 "
            ></input>
          </form>
        </div>
        <div className="col-5 mt-3 ">
          <button
            className="createButton"
            onClick={() => navigate("/post/new")}
          >
            Create
          </button>
          <i
            className="bi bi-house-door-fill"
            onClick={() => navigate("/posts")}
          ></i>
          {user && (
            <>
              <span className="mx-3 px-3">Hello {user.userName} !!!</span>
              <span className="logout" onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
          {!user && (
            <>
              <span
                className="mx-3 ps-3 logout"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
              <span className="logout pe-2">| </span>
              <span className="logout " onClick={() => navigate("/login")}>
                Login
              </span>
            </>
          )}
        </div>
      </div>

      <Outlet context={user} />
    </>
  );
}

export default Navbar;
