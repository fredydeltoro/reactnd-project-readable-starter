import React, { Component } from 'react';
import { makePost, modifyPost } from '../actions';
import { getId } from '../utils/utils';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { editPost, editComment } from '../utils/api';

class NewPost extends Component {
  state = {
    currentCategory: '',
    categories: this.props.categories ? this.props.categories:[],
    edit: false
  };

  close = ()=>{
    if (this.props.comment) {
      this.props.toogleModal({})();
    } else {
      this.props.toogleModal();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let content = serializeForm(e.target, {hash:true});
    if (this.props.post) {
      const oldPost = this.props.post;
      const editedPost = {};
      oldPost.title !== content.title ? editedPost.title = content.title : null;
      oldPost.body !== content.body ? editedPost.body = content.body : null;
      editPost(oldPost.id, editedPost).then((res) => {
        this.props.editingPost(res)
      })
    } else if (this.props.comment) {
      const oldComment = this.props.comment;
      const editedComment = {};
      oldComment.body !== content.body ? editedComment.body = content.body : null;
      let timeStamp = new Date();
      content.timestamp = timeStamp.getTime();
      editComment(oldComment.id, editedComment).then((res) => {
        this.props.editingComment(res)
        console.log(res);
      })
    } else {
      let timeStamp = new Date();
      content.timestamp = timeStamp.getTime();
      content.id = getId();
      this.props.dispatch(makePost(content, this.props.order))
    }

    this.close()
  }

  handleSelect = (e) => {
    let category = e.target.value;
    this.setState(()=>(
        {currentCategory: category}
      ))
  }

  componentDidMount() {
    if (this.props.currentCategory) {
      this.setState({currentCategory: this.props.currentCategory.replace('/', '')})
    } else if(this.props.post) {
      this.setState({edit: true})
      document.querySelector('#post-title').value = this.props.post.title;
      document.querySelector('#post-body').value = this.props.post.body;
    } else if (this.props.comment) {
      this.setState({edit: true})
      console.log(this.props.comment);
      document.querySelector('#post-body').value = this.props.comment.body;
    }
  }

  render() {
    return(
     <form onSubmit={this.handleSubmit}>
       <div className="modal-content">
         <div className="modal-header">
           <h5 className="modal-title" id="exampleModalLabel">New post</h5>
           <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div className="modal-body">
           {
             (this.props.post || !this.state.edit) && !this.props.comment ? <div className="form-group">
             <label htmlFor="post-title" className="form-control-label">Title:</label>
             <input type="text" className="form-control" name="title" id="post-title" required />
           </div> : ''
           }
             {
               this.state.edit ? '': <div className="form-group">
                 <label htmlFor="post-author" className="form-control-label">Author:</label>
                 <input type="text" className="form-control" name="author" id="post-author" required />
               </div>
             }

             {
               this.state.edit ? '': <div className="form-group">
                 <label htmlFor="post-category" className="form-control-label">Category:</label>
                 <select onChange={this.handleSelect} name="category" value={this.state.currentCategory} id="post-category" className="form-control" required>
                   <option value="">Select a category</option>
                   {
                     this.state.categories.map((category) => (
                       <option key={category.path} value={category.path}>{category.name}</option>
                     ))
                   }
                 </select>
               </div>
             }
             <div className="form-group">
               <label htmlFor="post-body" className="form-control-label">Body:</label>
               <textarea className="form-control" name="body" id="post-body" rows="5"></textarea>
             </div>
         </div>
         <div className="modal-footer">
           <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.close}>Close</button>
           <input type="submit" value={this.props.post ? 'Edit': 'Post'} className="btn btn-primary" />
         </div>
       </div>
     </form>
   );
  }
}

export default connect()(NewPost);
