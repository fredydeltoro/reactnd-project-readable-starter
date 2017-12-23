import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { dateFilter } from '../utils/utils';

function PostPreview(props) {
  let post = props.post
  return(
    <div className="col-md-8 offset-md-2 post-preview">
      <Link
        role="button"
        to={{
        pathname: `/${post.category}/${post.id}`,
      }}>
        <h2>
          {post.title}
        </h2>
        <h3>
          {post.body.slice(0, 120)} {post.body.length > 120 ? '...' : ''}
        </h3>
      </Link>
      <ul className="post-properties">
        <li>
          Posted on {dateFilter(post.timestamp)} by {post.author}
        </li>
        <li>
          Category: {post.category}
        </li>
        <li>
          Score: {post.voteScore}
        </li>
      </ul>
    </div>
  )
}

export default PostPreview;
