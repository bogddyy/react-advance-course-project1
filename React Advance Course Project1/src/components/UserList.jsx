import React from "react";
import "./UserList.css";
import UserItem from "./UserItem";

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h2>Lista utilizatori:</h2>
        <div className="user-list">
          {this.props.users.map((user) => {
            return (
              <UserItem
                key={user.id}
                name={user.name}
                email={user.email}
                salary={user.salary}
                isGoldClient={user.isGoldClient}
                profilePicture={user.profilePicture}
                onDelete={() => this.props.onDeleteUser(user.id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserList;
