import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

class App extends React.Component {
  constructor() {
    super();
    const savedBackground = localStorage.getItem("background") || "white";
    const savedColor = localStorage.getItem("color") || "black";

    // Încarcă utilizatorii din localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    this.state = {
      background: savedBackground,
      color: savedColor,
      users: savedUsers,
      posts: [],
      showUsers: true,
      postsLoaded: false,
    };
  }

  componentDidMount() {
    // Fetch la useri doar dacă nu există deja în localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (savedUsers.length === 0) {
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

          // Salvează utilizatorii în localStorage
          localStorage.setItem("users", JSON.stringify(users));

          this.setState({ users });
        });
    } else {
      this.setState({ users: savedUsers });
    }
  }

  changeColor = (event) => {
    const userBackground = event.target.value;
    this.setState({ background: userBackground });
    localStorage.setItem("background", userBackground); // Salvează culoarea de fundal
  };

  changeColorText = (event) => {
    const userColor = event.target.value;
    this.setState({ color: userColor });
    localStorage.setItem("color", userColor); // Salvează culoarea textului
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

    const newUser = {
      id: this.getMaxId(this.state.users) + 1,
      name,
      email,
      isGoldClient,
      salary: randomSalary,
      profilePicture: avatarUrl,
    };

    this.setState(
      (prevState) => ({
        users: [...prevState.users, newUser],
      }),
      () => {
        // Salvează utilizatorii în localStorage
        localStorage.setItem("users", JSON.stringify(this.state.users));
      }
    );
  };

  deleteUser = (userId) => {
    this.setState((prevState) => {
      const updatedUsers = prevState.users.filter((user) => user.id !== userId);

      // Actualizăm localStorage cu utilizatorii rămași
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return {
        users: updatedUsers,
      };
    });
  };

  toggleView = (view) => {
    if (view === "posts" && !this.state.postsLoaded) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          const filteredJson = json.filter((post) => post.id <= 8);
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
          style={{
            backgroundColor: this.state.background,
            minHeight: "100vh",
            color: this.state.color,
          }}
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
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
