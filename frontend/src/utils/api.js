const headers = {
  'Authorization': 'whatever-you-want',
  'credentials': 'same-origin',
  'Content-Type': 'application/json'
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

export const makePost = (post) =>
fetch('http://localhost:3001/posts', {
  headers: headers,
  method: 'POST',
  body:JSON.stringify(post)
})
.then(response => response.json())
.then(response => response)

export const makeComment = (comment) =>
fetch('http://localhost:3001/comments', {
  headers: headers,
  method: 'POST',
  body:JSON.stringify(comment)
})
.then(response => response.json())
.then(response => response)

export const votePost = (id, option) =>
fetch(`http://localhost:3001/posts/${id}`, {
  headers: headers,
  method: 'POST',
  body:JSON.stringify({option})
})
.then(response => response.json())
.then(response => response)

export const voteComment = (id, option) =>
fetch(`http://localhost:3001/comments/${id}`, {
  headers: headers,
  method: 'POST',
  body:JSON.stringify({option})
})
.then(response => response.json())
.then(response => response)

export const editPost = (id, post) =>
fetch(`http://localhost:3001/posts/${id}`, {
  headers: headers,
  method: 'PUT',
  body:JSON.stringify({...post})
})
.then(response => response.json())
.then(response => response)

export const editComment = (id, comment) =>
fetch(`http://localhost:3001/comments/${id}`, {
  headers: headers,
  method: 'PUT',
  body:JSON.stringify({...comment})
})
.then(response => response.json())
.then(response => response)

export const deletePost = (id) =>
fetch(`http://localhost:3001/posts/${id}`, {
  headers: headers,
  method: 'DELETE',
})
.then(response => response.json())
.then(response => response)

export const deleteComment = (id) =>
fetch(`http://localhost:3001/comments/${id}`, {
  headers: headers,
  method: 'DELETE',
})
.then(response => response.json())
.then(response => response)
