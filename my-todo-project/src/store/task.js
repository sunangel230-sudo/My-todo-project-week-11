import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  actions: {

    // 📥 GET ALL TASKS
    async fetchTasks() {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error

      this.tasks = data
    },

    // ➕ CREATE TASK
    async createTask(title, user_id) {
      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            completed: false,
            user_id
          }
        ])

      if (error) throw error

      await this.fetchTasks()
    },

    // ✏️ UPDATE TASK (TOGGLE)
    async updateTask(id, updates) {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      await this.fetchTasks()
    },

    // ❌ DELETE TASK
    async deleteTask(id) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error

      await this.fetchTasks()
    }
  }
})