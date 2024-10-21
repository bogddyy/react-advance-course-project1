import React from "react";
import "./PostItem.css";

const PostItem = ({ title, body }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default PostItem;
