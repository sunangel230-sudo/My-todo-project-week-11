import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),

  actions: {
    // 👤 Get current logged-in user
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()

      // Ignore "no session" error
      if (error && error.message !== 'Auth session missing!') {
        console.log('fetchUser error:', error.message)
        this.user = null
        return
      }

      this.user = data?.user || null
    },

    // 🔐 Sign up
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        console.log('signUp error:', error.message)
        throw error
      }

      this.user = data?.user || null
    },

    // 🔐 Sign in
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.log('signIn error:', error.message)
        throw error
      }

      this.user = data.user
    },

    // 🚪 Sign out
    async signOut() {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.log('signOut error:', error.message)
        throw error
      }

      this.user = null
    }
  },

  // 💾 Persist login state
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})