import React, { Component } from 'react';
import { makePost } from '../actions';
import { getId } from '../utils/utils';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';

class NewPost extends Component {
  state = {
    currentCategory: this.props.currentCategory.replace('/', ''),
    categories: this.props.categories
  };

  close = ()=>{
    this.props.toogleModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let post = serializeForm(e.target, {hash:true});
    let timeStamp = new Date();
    post.timestamp = timeStamp.getTime();
    post.id = getId();
    this.props.dispatch(makePost(post))
    this.close()
  }

  handleSelect = (e) => {
    let category = e.target.value;
    this.setState(()=>(
        {currentCategory: category}
      ))
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
             <div className="form-group">
               <label htmlFor="post-title" className="form-control-label">Title:</label>
               <input type="text" className="form-control" name="title" id="post-title" required />
             </div>
             <div className="form-group">
               <label htmlFor="post-author" className="form-control-label">Author:</label>
               <input type="text" className="form-control" name="author" id="post-author" required />
             </div>
             <div className="form-group">
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
             <div className="form-group">
               <label htmlFor="post-body" className="form-control-label">Body:</label>
               <textarea className="form-control" name="body" id="post-body" rows="5"></textarea>
             </div>
         </div>
         <div className="modal-footer">
           <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.close}>Close</button>
           <input type="submit" value="Post" className="btn btn-primary" />
         </div>
       </div>
     </form>
   );
  }
}

export default connect()(NewPost);
