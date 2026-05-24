<template>
  <form @submit.prevent="register">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button>Sign Up</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/user'

const email = ref('')
const password = ref('')
const userStore = useUserStore()

const register = async () => {
  await userStore.signUp(email.value, password.value)
}
</script>
