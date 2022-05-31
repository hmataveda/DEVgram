import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import Navbar from "./components/navbar/navbar";
import AllPosts from "./components/posts/allPosts";
import SinglePost from "./components/posts/singlePost";
import Author from "./components/posts/profile";
import Create from "./components/posts/create-update/create";
import Update from "./components/posts/create-update/update";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navbar />}>
          <Route path="posts" element={<AllPosts />}></Route>
          <Route path="post/:id" element={<SinglePost />}></Route>
          <Route path="author/:name" element={<Author />}></Route>
          <Route path="post/new" element={<Create />}></Route>
          <Route path="post/update/:id" element={<Update />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
