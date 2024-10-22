import React from "react";
import "./UserAddForm.css";

class UserAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      isGoldClient: false,
      profilePicture: "",
      error: "",
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  updateName = (event) => {
    this.setState({ name: event.target.value, error: "" });
  };

  updateEmail = (event) => {
    this.setState({ email: event.target.value, error: "" });
  };

  updateIsGoldClient = (event) => {
    this.setState({ isGoldClient: event.target.checked });
  };

  // Funcție pentru generarea avatarului
  generateAvatar = (name) => {
    const formattedName = name.split(" ").join("+");
    return `https://ui-avatars.com/api/?name=${formattedName}`;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, isGoldClient } = this.state;
    this.props.submitAddForm(event, name, email, isGoldClient);
    this.setState({ name: "", email: "", isGoldClient: false });
  };

  render() {
    return (
      <form className="user-add-form" onSubmit={this.handleSubmit}>
        <h2>Adaugă un utilizator nou</h2>
        <label htmlFor="name">Nume:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.updateName}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.updateEmail}
          required
        />

        <label htmlFor="gold-client">E client gold?</label>
        <input
          type="checkbox"
          name="gold-client"
          checked={this.state.isGoldClient}
          onChange={this.updateIsGoldClient}
        />

        <input type="submit" value="Submite formularul!" />
      </form>
    );
  }
}

export default UserAddForm;
