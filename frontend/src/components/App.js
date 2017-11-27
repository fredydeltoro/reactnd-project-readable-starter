import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import MainPage from './MainPage';
import Category from './Category';
import Post from './Post';
import * as _ from 'lodash';

class App extends Component {
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
            </ul>
          </div>
          </div>
        </nav>
        <main className="container">
          <Route
            exact
            path="/"
            render={
              () => (
                <MainPage posts={this.props.posts}/>
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
            path="/post/:id"
            render={
              ({match, location}) => {
                let post = false;
                if (location.state) {
                  post = location.state.post;
                }
                let id = match.params.id;
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

function mapStateToProps({categories, posts}) {
  return {
    categories,
    posts
  }
}

export default withRouter(connect(mapStateToProps)(App));
