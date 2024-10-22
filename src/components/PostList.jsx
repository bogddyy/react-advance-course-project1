import React from "react";
import "./PostList";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      <h2 className="posts-list">Lista postari:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostItem title={post.title} body={post.body} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
