const headers = {
  'Authorization': 'whatever-you-want',
  'credentials': "same-origin"
}

export const getCategories = () =>
  fetch('http://localhost:3001/categories', {headers:headers})
  	.then(response => response.json())
  	.then(response => response)

export const getPosts = () =>
  fetch('http://localhost:3001/posts', {headers:headers})
  	.then(response => response.json())
  	.then(response => response)

export const getCategoryPosts = (category) =>
  fetch(`http://localhost:3001/${category}/posts`, {headers:headers})
  	.then(response => response.json())
  	.then(response => response)

export const getPost = (id) =>
  fetch(`http://localhost:3001/posts/${id}`, {headers:headers})
  	.then(response => response.json())
  	.then(response => response)

export const getComments = (id) =>
  fetch(`http://localhost:3001/posts/${id}/comments`, {headers:headers})
  	.then(response => response.json())
  	.then(response => response)
