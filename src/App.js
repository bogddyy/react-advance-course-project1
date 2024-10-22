import React from "react";
import "./App.css";
import UserAddForm from "./components/UserAddForm";
import UserList from "./components/UserList";
import PostList from "./components/PostList";

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

  changeColor(event) {
    const userBackground = event.target.value;
    this.setState({ background: userBackground });
  }

  changeColorText(event) {
    const userColor = event.target.value;
    this.setState({ color: userColor });
  }

  getMaxId(users) {
    let maxId = 0;
    users.forEach((user) => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();

    // Construieste URL-UL avatar-ului
    const avatarUrl = `https://ui-avatars.com/api/?name=${name.replace(
      " ",
      "+"
    )}&size=256&background=random&color=fff`;

    // Genereaza un salariu random
    const randomSalary = Math.floor(Math.random() * 3000) + 3000;

    // Adaugăm noul utilizator în lista de utilizatori
    this.setState((prevState) => {
      return {
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
      };
    });
  }

  deleteUser = (userId) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== userId),
    }));
  };

  toggleView(view) {
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
  }

  updateUsersList(user) {
    this.setState((previousState) => {
      return {
        users: [...previousState.users, user],
      };
    });
  }

  render() {
    return (
      <div
        className="App"
        style={{ background: this.state.background, color: this.state.color }}
      >
        <h1>Admin panel - Proiectul 1</h1>
        <button onClick={() => this.toggleView("users")}>Afișează useri</button>
        <button onClick={() => this.toggleView("posts")}>
          Afișează postări
        </button>
        <label>Alege culoarea de fundal:</label>
        <input type="color" onChange={(event) => this.changeColor(event)} />
        <label>Alege culoarea textului:</label>
        <input type="color" onChange={(event) => this.changeColorText(event)} />
        <UserAddForm
          submitAddForm={(event, name, email, isGoldClient) =>
            this.submitAddForm(event, name, email, isGoldClient)
          }
        />
        {this.state.showUsers ? (
          <UserList
            // Transmiterea funcției de ștergere
            onDeleteUser={this.deleteUser}
            users={this.state.users}
          />
        ) : (
          <PostList posts={this.state.posts} />
        )}
      </div>
    );
  }
}

export default App;
