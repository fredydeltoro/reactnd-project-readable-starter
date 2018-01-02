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
import NotFound from './NotFound';
import * as _ from 'lodash';

class Post extends Component {
  state = {
    post: {},
    comments: [],
    editModalOpen: false,
    editCommentModalOpen: false,
    redirect: false,
    comment: {}
  }

  addComment = (comment) => {
    this.setState((prevState) => {
      let newPost = prevState.post;
      newPost.commentCount += 1;
      this.props.dispatch(modifyPost(newPost));
      return {
        comments : prevState.comments.concat([comment]),
        post:newPost
      }
     }
    )
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

  editingComment = (editedComment) => {
    this.setState((prevState) => {
      let newComments = prevState.comments.map((comment) => {
        if (comment.id === editedComment.id) {
          return editedComment;
        } else {
          return comment;
        }
      })
      return {comments: newComments}
    })
  }

  handleDelete = (e) => {
    deletePost(this.state.post.id)
      .then((res) => {
        this.props.dispatch(removePost(res.id))
      })
      this.setState({redirect:true});
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
            this.editingComment(res);
          })
          break;
      }
    }
  }

  openModal = () => {
    this.setState((prevState) =>(
      {editModalOpen:!prevState.editModalOpen}
    ))
  }

  openModalComment = (comment) => {
    return (e) => {
      this.setState({comment})
      this.setState((prevState) =>(
        {editCommentModalOpen:!prevState.editCommentModalOpen}
      ))
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
      <div>
        {
          this.state.redirect ? <Redirect to="/" /> :

          !_.isEmpty(post) ?
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
                <div className="count-comment">
                  <small>
                    Comments {post.commentCount}
                  </small>
                </div>
              </div>
            </div>
            <Modal
              className="modal-dialog modal-lg"
              isOpen={this.state.editModalOpen}
              >
                <NewPost toogleModal={this.openModal} post={post} editingPost={this.editingPost}/>
            </Modal>
            <div className="col-md-8 offset-md-2">
              <Modal
                className="modal-dialog modal-lg"
                isOpen={this.state.editCommentModalOpen}
                >
                  <NewPost toogleModal={this.openModalComment} comment={this.state.comment} editingComment={this.editingComment}/>
              </Modal>
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
                          <div className="comment-controls">
                            <Votes data={comment} handleVote={this.handleVote} type='comment' />
                            <div className="edit-comment" onClick={this.openModalComment(comment)}>
                              <small>
                                Edit
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>  : <NotFound />
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
