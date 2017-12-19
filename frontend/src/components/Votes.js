import React, { Component } from 'react';

function Votes(props) {
  const {data, handleVote, type} = props;
  return(
    <div className="votes">
      <small>
        {data.voteScore}
      </small>
      <div className="up-comment" onClick={handleVote(data.id, 'upVote', type)}>
        <i className="fa fa-angle-up"></i>
      </div>
      <div className="down-comment" onClick={handleVote(data.id, 'downVote', type)}>
        <i className="fa fa-angle-down"></i>
      </div>
    </div>
  )
}

export default Votes;
