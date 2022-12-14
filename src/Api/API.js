import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '7cd5013f-2384-47a4-9824-a3fc25e74bbf',
  },
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },
  unFollow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data)
  },
  follow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data)
  },
}

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`).then((response) => response.data)
  },
  getStatus(id) {
    return instance
      .get(`profile/status/${id}`)
      .then((response) => response.data)
  },
  updateStatus(status) {
    return instance
      .put(`profile/status`, { status })
      .then((response) => response.data)
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => response.data)
  },
  login(email, password, rememberMe = false, isAuth = false) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, isAuth })
      .then((response) => response.data)
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data)
  },
}
