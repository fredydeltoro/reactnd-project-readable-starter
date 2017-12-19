import { combineReducers } from 'redux'
import { SET_CATEGORIES, SET_POSTS, SET_POST, EDIT_POST, DELETE_POST, SORT } from '../actions';
import * as _ from 'lodash';

const categoriesState = [];
const postsState = [];
const orderState = 'timestamp';

function order(state=orderState, action) {
  switch (action.type) {
    case SORT:
      return action.by
      break;
    default:
      return state
  }
}

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
    case SET_POST:
      return state.concat([action.post])
      break;
    case EDIT_POST:
      let newState = state.map((post) => {
        if (post.id === action.post.id) {
          return action.post
        } else {
          return post;
        }
      })
      return newState
      break;
    case DELETE_POST:
      return state.filter((post) => {
        if (post.id !== action.id) {
          return post;
        }
      });
      break;
    case SORT:
      if (action.by === '-timestamp') {
        return _.sortBy(state, action.by.replace('-', ''))
      }
      return _.sortBy(state, action.by).reverse()
      break;
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  order
});
