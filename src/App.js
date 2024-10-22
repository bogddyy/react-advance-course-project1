import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: "white",
      color: "black",
      users: [],
      posts: [],
      showUsers: true,
      postsLoaded: false,
    };
  }

  componentDidMount() {
    // Fetch la useri
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        users = users.filter((user) => user.id <= 8);
        users.forEach((user) => {
          user.isGoldClient = false;
          user.salary = Math.floor(Math.random() * 3000) + 3000;
          user.profilePicture = `https://ui-avatars.com/api/?name=${user.name.replace(
            " ",
            "+"
          )}&size=256&background=random&color=fff`;
        });
        this.setState({ users });
      });
  }

  changeColor = (event) => {
    const userBackground = event.target.value;
    this.setState({ background: userBackground });
  };

  changeColorText = (event) => {
    const userColor = event.target.value;
    this.setState({ color: userColor });
  };

  getMaxId(users) {
    let maxId = 0;
    users.forEach((user) => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });
    return maxId;
  }

  submitAddForm = (event, name, email, isGoldClient) => {
    event.preventDefault();
    const avatarUrl = `https://ui-avatars.com/api/?name=${name.replace(
      " ",
      "+"
    )}&size=256&background=random&color=fff`;
    const randomSalary = Math.floor(Math.random() * 3000) + 3000;
    this.setState((prevState) => ({
      users: [
        ...prevState.users,
        {
          id: this.getMaxId(prevState.users) + 1,
          name,
          email,
          isGoldClient,
          salary: randomSalary,
          profilePicture: avatarUrl,
        },
      ],
    }));
  };

  deleteUser = (userId) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== userId),
    }));
  };

  toggleView = (view) => {
    if (view === "posts" && !this.state.postsLoaded) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          const filteredJson = json.filter((post) => post.id <= 10);
          this.setState({
            posts: filteredJson,
            postsLoaded: true,
          });
        });
    }
    this.setState({ showUsers: view === "users" });
  };

  render() {
    return (
      <Router>
        <div
          style={{ backgroundColor: this.state.background, minHeight: "100vh" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  users={this.state.users}
                  posts={this.state.posts}
                  onAddUser={this.submitAddForm}
                  onDeleteUser={this.deleteUser}
                  background={this.state.background}
                  color={this.state.color}
                  changeColor={this.changeColor}
                  changeColorText={this.changeColorText}
                  showUsers={this.state.showUsers}
                  toggleView={this.toggleView}
                />
              }
            />
            <Route
              path="/about"
              element={
                <About
                  background={this.state.background}
                  color={this.state.color}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
