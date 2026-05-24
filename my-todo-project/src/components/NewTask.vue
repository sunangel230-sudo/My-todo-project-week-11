<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="New task" />
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../store/task'

const title = ref('')
const taskStore = useTaskStore()

const addTask = async () => {
  await taskStore.createTask({
    title: title.value,
    isComplete: false
  })
  title.value = ''
}
</script>