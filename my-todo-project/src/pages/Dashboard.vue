<template>
  <div>
    <AppHeader />
    <NewTask />

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useTaskStore } from '../store/task'

import AppHeader from '../components/AppHeader.vue'
import NewTask from '../components/NewTask.vue'
import TaskItem from '../components/TaskItem.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.fetchTasks()
})
</script>