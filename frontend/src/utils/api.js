let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': 'whatever-you-want',
  'credentials': "same-origin"
}
export const getCategories = () =>
  fetch('/categories', {headers:headers})
  	.then(response => response.json())
  	.then(response => response)
