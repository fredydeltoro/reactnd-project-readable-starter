import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sort } from '../actions';
import '../App.css';
import Modal from 'react-modal';
import MainPage from './MainPage';
import Category from './Category';
import Post from './Post';
import NewPost from './NewPost'

class App extends Component {
  state = {
    postModalOpen: false,
    showDropDown: false,
    order: 'newest'
  }

  toogleDropDown = () => {
    this.setState((prevState) =>(
      {showDropDown:!prevState.showDropDown}
    ))
  }

  handleOrder = (e) => {
    let order = e.target.innerText;
    this.setState({
      order: order
    });
    switch (order) {
      case 'best':
        this.props.dispatch(sort('voteScore'));
        break;
      case 'newest':
        this.props.dispatch(sort('timestamp'));
        break;
      case 'oldest':
        this.props.dispatch(sort('-timestamp'));
        break;

    }
  }

  toggleModal = () =>{
      this.setState((prevState) =>(
        {postModalOpen:!prevState.postModalOpen}
      ))
    }

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <div className="container">
            <NavLink className="navbar-brand" to="/">The Developer Blog</NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {
                  this.props.categories.map((c) =>
                  <li className="nav-item" key={c.path}>
                    <NavLink to={`/${c.path}`} className="nav-link" strict>{c.name}</NavLink>
                  </li>
                )
              }
              <li className={`nav-item dropdown ${this.state.showDropDown ? 'show': ''}`} onClick={this.toogleDropDown}>
                <a className="nav-link dropdown-toggle"> {this.state.order}</a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={this.handleOrder}>best</li>
                  <li className="dropdown-item" onClick={this.handleOrder}>newest</li>
                  <li className="dropdown-item" onClick={this.handleOrder}>oldest</li>
                </ul>
              </li>
            </ul>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.toggleModal}>New Post</button>
          </div>
          </div>
        </nav>
        <Modal
          className="modal-dialog modal-lg"
          isOpen={this.state.postModalOpen}
          >
            <NewPost toogleModal={this.toggleModal} categories={this.props.categories} currentCategory={window.location.pathname} order={this.props.order}/>
        </Modal>
        <main className="container">
          <Route
            exact
            path="/"
            render={
              () => (
                <MainPage posts={this.props.posts} order={this.props.order}/>
              )
            }
          />
          <Route
            exact
            path="/:category"
            render={
              () => (
                <Category path={window.location.pathname}/>
              )
            }
          />
          <Route
            exact
            path="/:category/:id"
            render={
              ({match}) => {
                let id = match.params.id;
                let post = this.props.posts.find((post) => {
                  if (post.id === id) {
                    return post
                  }
                })
                return (
                  <Post id={id} post={post}/>
                )
              }
            }
          />
        </main>
      </div>
    );
  }
}

function mapStateToProps({categories, posts, order}) {
  return {
    categories,
    posts,
    order
  }
}

export default withRouter(connect(mapStateToProps)(App));
