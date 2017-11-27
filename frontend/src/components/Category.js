import React, {Component} from 'react';
import PostPreview from './PostPreview';
import {getCategoryPosts} from '../utils/api';
import {connect} from 'react-redux';

class Category extends Component {
  state = {
    posts: []
  }

  checkState = props => {
    let category = props.path.replace('/', '');
    if (!props.posts.length) {
      getCategoryPosts(category).then(response => {
        this.setState({posts: response});
      })
    } else {
      let posts = props.posts.filter(post => {
        if (post.category == category) {
          return post;
        }
      });
      this.setState({posts: posts});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkState(nextProps);
  }

  componentDidMount() {
    this.checkState(this.props);
  }

  render() {
    return (<div className="row">
      {this.state.posts.map((post) => <PostPreview key={post.id} post={post}/>)}
    </div>)
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

export default connect(mapStateToProps)(Category)
