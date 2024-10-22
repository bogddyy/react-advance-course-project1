import React from "react";
import UserAddForm from "../UserAddForm";
import UserList from "../UserList";
import PostList from "../PostList";
import { Link } from "react-router-dom";
import "../../App.css";

const Home = ({
  users,
  posts,
  onAddUser,
  onDeleteUser,
  background,
  color,
  changeColor,
  changeColorText,
  showUsers,
  toggleView,
}) => {
  return (
    <div
      style={{
        background,
        color,
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Admin panel - Proiectul 1</h1>
      <button onClick={() => toggleView("users")}>Afișează useri</button>
      <button onClick={() => toggleView("posts")}>Afișează postări</button>
      <label>Alege culoarea de fundal:</label>
      <input type="color" onChange={changeColor} />
      <label>Alege culoarea textului:</label>
      <input type="color" onChange={changeColorText} />
      <UserAddForm submitAddForm={onAddUser} />
      {showUsers ? (
        <UserList onDeleteUser={onDeleteUser} users={users} />
      ) : (
        <PostList posts={posts} />
      )}
      <footer>
        <Link to="/about">About</Link>
      </footer>
    </div>
  );
};

export default Home;
