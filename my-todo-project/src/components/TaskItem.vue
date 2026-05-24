<template>
  <div class="task-item">
    <p>{{ task.title }}</p>

    <button @click="toggle">
      Toggle
    </button>

    <button @click="remove">
      Delete
    </button>
  </div>
</template>

<script setup>
import { useTaskStore } from '../store/task'

const props = defineProps(['task'])

const taskStore = useTaskStore()

const toggle = async () => {
  await taskStore.updateTask(props.task.id, {
    isComplete: !props.task.isComplete
  })
}

const remove = async () => {
  await taskStore.deleteTask(props.task.id)
}
</script>