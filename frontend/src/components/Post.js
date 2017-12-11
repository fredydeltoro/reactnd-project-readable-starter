import React, { Component } from 'react';
import { getPost, getComments, voteComment } from '../utils/api';
import { dateFilter } from '../utils/utils';
import unknowUser from '../no-user.png';
import CommentForm from './CommentForm'

class Post extends Component {
  state = {
    post: {},
    comments: []
  }

  addComment = (comment) => {
    this.setState((prevState) => (
      {comments : prevState.comments.concat([comment])}
    ))
  }

  handleVote = (id, option) => {
    return  (e) => {
      voteComment(id, option)
        .then((res) => {
          this.setState((prevState) => {
            let newComments = prevState.comments.filter((comment) => {
              return comment;
            })
            newComments.find((comment) => {
              if (comment.id === id) {
                comment.voteScore = res.voteScore;
              }
            })
            return {comments: newComments}
          })
        })
    }
  }

  componentDidMount() {
    if (this.props.post) {
      this.setState({post:this.props.post})
    } else {
      getPost(this.props.id).then(response => {
        this.setState({post:response});
      })
    }
    getComments(this.props.id).then(response => {
      this.setState({comments:response});
    })
  }

  render() {
    let post = this.state.post
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="post">
            <div className="header-post">
              <h2>{post.title}</h2>
              <span>Posted on {dateFilter(post.timestamp)} by {post.author}</span>
            </div>
            <div className="body-post">
              <p>
                {post.body}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-8 offset-md-2">
          <div className="comments">
            <CommentForm parentId={post.id} addComment={this.addComment} />
            <ul>
              {this.state.comments.map((comment) => (
                <li key={comment.id}>
                  <div className="comment">
                    <img src={unknowUser} alt=""/>
                    <div className="content">
                      <div>
                        <b>
                          {comment.author} &nbsp;
                        </b>
                        <small>
                          {dateFilter(comment.timestamp)}
                        </small>
                      </div>
                      <div>
                        {comment.body}
                      </div>
                      <div className="comment-votes">
                        <small>
                          {comment.voteScore}
                        </small>
                        <div className="up-comment" onClick={this.handleVote(comment.id, 'upVote')}>
                          <i className="fa fa-angle-up"></i>
                        </div>
                        <div className="down-comment" onClick={this.handleVote(comment.id, 'downVote')}>
                          <i className="fa fa-angle-down"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
