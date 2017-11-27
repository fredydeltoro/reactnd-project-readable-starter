import React, { Component } from 'react';
import {  Link } from 'react-router-dom';

function PostPreview(props) {
  let post = props.post
  return(
    <div className="col-md-4">
      <h2>{post.title}</h2>
      <ul className="post-properties">
        <li>
          <b>Author:</b> {post.author}
        </li>
        <li>
          <b>Category:</b> {post.category}
        </li>
        <li>
          <b>Score:</b> {post.voteScore}
        </li>
      </ul>
      <p>
        {post.body.slice(0, 120)} {post.body.length > 120 ? '...' : ''}
      </p>
      <p>
        <Link
          className="btn btn-primary"
          role="button"
          to={{
          pathname: `/post/${post.id}`,
          state: {post: post}
        }}>View details »</Link>
      </p>
    </div>
  )
}

export default PostPreview;
