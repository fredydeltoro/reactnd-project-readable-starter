import React, { Component } from 'react';
import { getPost, getComments } from '../utils/api';

class Post extends Component {
  state = {
    post: {},
    comments: []
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
        <div className="col-md-10 offset-md-2">
          <div className="header-post">
            <h2>{post.title}</h2>
          </div>
          <div className="body-post">
            <p>
              {post.body}
            </p>
          </div>
        </div>
        <div className="col-md-10 offset-md-2">
          {JSON.stringify(this.state.comments)}
        </div>
      </div>
    );
  }
}

export default Post;
