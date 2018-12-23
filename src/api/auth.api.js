import axios from 'axios'

const API = {}

API.login = (data) => new Promise((res, rej) =>
  post('/api/user/login', data)
    .then(response => res(response.data))
    .catch(error => rej(error))
)

export default API

function post (url, data) {
  return axios({method: 'post', url, data})
}