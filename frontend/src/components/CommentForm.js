import React, { Component } from 'react';
import { getId } from '../utils/utils';
import { makeComment } from '../utils/api';
import serializeForm from 'form-serialize';

function handleSubmit(parentId, addComment) {
  return function (e) {
    e.preventDefault();
    let comment = serializeForm(e.target, {hash:true});
    let timeStamp = new Date();
    comment.id = getId();
    comment.timestamp = timeStamp.getTime();
    comment.parentId = parentId
    makeComment(comment).then((res) => {
      addComment(res)
    });
    document.querySelector('.comment-form > form').reset();
  }
}


function CommentForm(props) {
  const { parentId, addComment} = props;
  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit(parentId, addComment)}>
        <div className="comment-box">
          <div className="textarea-wrapper">
            <textarea name="body" required />
            <div className="comment-form-actions">
              <input className="comment-author" name="author" placeholder="Author:" type="text" required />
              <input className="post-comment" type="submit" value='Add Comment' />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
