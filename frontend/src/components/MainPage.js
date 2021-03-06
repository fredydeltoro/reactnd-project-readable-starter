import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions';
import PostPreview from './PostPreview'

class MainPage extends Component {

  componentDidMount() {
    if (!this.props.posts.length)
      this.props.dispatch(getPosts(this.props.order));
    }

  render() {
    return (
      <div className="row">
        {
          this.props.posts.map((post) => <PostPreview key={post.id} dispatch={this.props.dispatch} post={post}/>)
        }
      </div>
    )
  }
}

export default connect()(MainPage)
