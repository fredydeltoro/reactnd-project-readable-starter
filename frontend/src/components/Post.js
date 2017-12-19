import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getPost, getComments, votePost, voteComment, deletePost, deleteComment } from '../utils/api';
import { modifyPost, removePost, sort } from '../actions';
import { dateFilter } from '../utils/utils';
import Modal from 'react-modal';
import unknowUser from '../no-user.png';
import CommentForm from './CommentForm';
import Votes from './Votes';
import NewPost from './NewPost';

class Post extends Component {
  state = {
    post: {},
    comments: [],
    edittModalOpen: false,
    redirect: false
  }

  addComment = (comment) => {
    this.setState((prevState) => (
      {comments : prevState.comments.concat([comment])}
    ))
  }

  editingPost = (newPost) => {
    if (this.props.post) {
      this.props.dispatch(modifyPost(newPost));
      this.setState({post:newPost});
    } else {
      this.setState({post:newPost});
    }
    this.props.dispatch(sort(this.props.order));
  }

  handleDelete = (e) => {
    deletePost(this.state.post.id)
      .then((res) => {
        this.props.dispatch(removePost(res.id))
      })
      this.setState({redirect:true})
  }

  handleDeleteComment = (id) => {
    return (e) => {
      deleteComment(id).then(() => {
        this.setState((prevState) => {
          let newState = prevState.comments.filter((comment) => {
            if (comment.id !== id) {
              return comment
            }
          })
          return {comments: newState}
        })
      })
    }
  }

  handleVote = (id, option, type) => {

    return  (e) => {
      switch (type) {
        case 'post':
          votePost(id, option)
          .then((res) => {
            this.editingPost(res);
          })
          break;
        case 'comment':
        voteComment(id, option)
          .then((res) => {
            this.setState((prevState) => {
              let newComments = prevState.comments.map((comment) => {
                if (comment.id === id) {
                  return res;
                } else {
                  return comment;
                }
              })
              return {comments: newComments}
            })
          })
          break;
      }
    }
  }

  openModal = () => {
    this.setState((prevState) =>(
      {edittModalOpen:!prevState.edittModalOpen}
    ))
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
      <div>
        { !this.state.redirect ?
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="post">
                <div className="header-post">
                  <h2>
                    <b>{post.title}</b>
                  </h2>
                  <span>Posted on {dateFilter(post.timestamp)} by {post.author}</span>
                  <div className="post-controls">
                    <div className="post-votes">
                      <Votes data={post} handleVote={this.handleVote} type='post' />
                    </div>
                    <div className="btn btn-outline-danger" onClick={this.handleDelete}>
                      Delete
                    </div>
                    <div className="btn btn-outline-primary" onClick={this.openModal}>
                      Edit
                    </div>
                  </div>
                </div>
                <div className="body-post">
                  <p>
                    {post.body}
                  </p>
                </div>
              </div>
            </div>
            <Modal
              className="modal-dialog modal-lg"
              isOpen={this.state.edittModalOpen}
              >
                <NewPost toogleModal={this.openModal} post={post} editingPost={this.editingPost}/>
            </Modal>
            <div className="col-md-8 offset-md-2">
              <div className="comments">
                <CommentForm parentId={post.id} addComment={this.addComment} />
                <ul>
                  {this.state.comments.map((comment) => (
                    <li key={comment.id}>
                      <div className="comment">
                        <div className="comment-delete text-danger" onClick={this.handleDeleteComment(comment.id)}>
                          &times;
                        </div>
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
                          <div className="comment-body">
                            {comment.body}
                          </div>
                          <Votes data={comment} handleVote={this.handleVote} type='comment' />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>  : <Redirect to="/"/>
        }
      </div>
    );
  }
}

function mapStateToProps({order}) {
  return {
    order
  };
}

export default connect(mapStateToProps)(Post);
