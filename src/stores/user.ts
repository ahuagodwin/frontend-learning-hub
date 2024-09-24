import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: JSON.parse(localStorage.getItem('@user') || 'null'),
    token: localStorage.getItem('@accessToken') || null,
    error: null
  }),

  actions: {
    async login(username: string, password: string) {
      this.error = null

      try {
        const response = await axios.get('/api/users')
        const users = response.data

        const user = users.find(
          (u: UserLogin) => u.username === username && u.password === password
        )

        if (user) {
          this.user = user
          const token = `godwin-jwt-token-${user.id}`
          this.token = token

          // Save the user and token to localStorage
          localStorage.setItem('@user', JSON.stringify(user))
          localStorage.setItem('@accessToken', token)
          return true
        } else {
          this.error = 'Invalid username or password'
          return false
        }
      } catch (error) {
        this.error = 'Failed to login. Please try again later.'
        return false
      }
    },

    async fetchUserDetailsById(userId: string) {
      try {
        const response = await axios.get(`/api/usersDetails/${userId}`)
        this.user = { ...this.user, ...response.data }

        // Update the user in localStorage
        localStorage.setItem('@user', JSON.stringify(this.user))
      } catch (error) {
        this.error = 'Failed to fetch user details'
      }
    },

    logout() {
      this.user = null
      this.token = null

      // Clear localStorage
      localStorage.removeItem('@user')
      localStorage.removeItem('@accessToken')
    },

    isAuthenticated() {
      return !!this.token
    }
  }
})
