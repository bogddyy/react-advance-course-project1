import React from "react";
import "./UserItem.css";

const UserItem = ({
  name,
  email,
  salary,
  isGoldClient,
  profilePicture,
  onDelete,
}) => {
  return (
    <div className="user-item">
      <img
        src={profilePicture || "https://via.placeholder.com/150"}
        alt={`${name}'s profile`}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Salariu: {salary} RON</p>
      {isGoldClient && <p style={{ color: "gold" }}>CLIENT GOLD</p>}
      <button onClick={onDelete}>Șterge</button>
    </div>
  );
};

export default UserItem;
