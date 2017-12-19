// export const GET_CATEGORIES = 'GET_CATEGORIES';
import * as api from '../utils/api';
import * as _ from 'lodash';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const SORT = 'SORT';

export function getCategories() {
  return dispatch =>
  api.getCategories()
    .then(res => res.categories)
    .then(categories =>
      dispatch(setCategories(categories))
    );
}

export function getPosts(order) {
  return (dispatch, getState) =>{
    api.getPosts()
    .then(posts =>{
      dispatch(setPosts(posts))
      const newState = getState()
      if (newState.posts.length) {
        dispatch(sort(order))
      }
    }
  );
  }
}

export function makePost(post, order) {
  return (dispatch, getState) =>{
    api.makePost(post)
    .then((res) => {
      const currentState = getState();
      if (currentState.posts.length) {
        dispatch(setPost(_.merge(post, res)))
        dispatch(sort(order))
      }
    })
  }
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}

export function modifyPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}

export function removePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function sort(by) {
  return {
    type: SORT,
    by
  }
}
