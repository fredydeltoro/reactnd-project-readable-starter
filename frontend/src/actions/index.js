import * as api from '../utils/api';
// export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';

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
