import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { dateFilter } from '../utils/utils';
import { votePost, deletePost } from '../utils/api';
import { modifyPost, removePost, sort } from '../actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import NewPost from './NewPost';
import Votes from './Votes';

class PostPreview extends Component {

  state = {
    edittModalOpen: false
  }

  editingPost = (newPost) => {
    this.props.dispatch(modifyPost(newPost));
  }

  handleVote = (id, option) => {
    return  (e) => {
      votePost(id, option)
      .then((res) => {
        this.props.dispatch(modifyPost(res));
        this.props.dispatch(sort(this.props.order));
      })
    }
  }

  handleDelete = (id) => {
    return (e) => {
      deletePost(id)
        .then((res) => {
          this.props.dispatch(removePost(res.id))
        })
    }
  }

  openModal = () => {
    this.setState((prevState) =>(
      {edittModalOpen:!prevState.edittModalOpen}
    ))
  }

  render() {
    let post = this.props.post
    return(
      <div className="col-md-8 offset-md-2 post-preview">
        <div className="post-delete text-danger" onClick={this.handleDelete(post.id)}>
          &times;
        </div>
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
        <div className="post-controls">
          <Votes data={post} handleVote={this.handleVote} type='post' />
          <div className="btn btn-outline-primary" onClick={this.openModal}>
            Edit
          </div>
        </div>
        <ul className="post-properties">
          <li>
            Posted on {dateFilter(post.timestamp)} by {post.author}
          </li>
          <li>
            Category: {post.category}
          </li>
          <li>
            Comments: {post.commentCount}
          </li>
        </ul>
        <Modal
          className="modal-dialog modal-lg"
          isOpen={this.state.edittModalOpen}
          >
            <NewPost toogleModal={this.openModal} post={post} editingPost={this.editingPost}/>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({order}) {
  return {
    order
  };
}

export default connect(mapStateToProps)(PostPreview);
