import { combineReducers } from 'redux'
import { SET_CATEGORIES, SET_POSTS } from '../actions';

const categoriesState = [];
const postsState = [];

function categories (state=categoriesState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
       return action.categories
      break;
    default:
      return state
  }
}

function posts (state=postsState, action) {
  switch (action.type) {
    case SET_POSTS:
       return action.posts
      break;
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
});
