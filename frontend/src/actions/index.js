// export const GET_CATEGORIES = 'GET_CATEGORIES';
import * as api from '../utils/api';
import * as _ from 'lodash';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';

export function getCategories() {
  return dispatch =>
  api.getCategories()
    .then(res => res.categories)
    .then(categories =>
      dispatch(setCategories(categories))
    );
}

export function getPosts() {
  return dispatch =>
  api.getPosts()
    .then(posts =>
      dispatch(setPosts(posts))
    );
}

export function makePost(post) {
  return dispatch =>{
    api.makePost(post)
    .then((res) => {
      dispatch(setPost(_.merge(post, res)))
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

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}
