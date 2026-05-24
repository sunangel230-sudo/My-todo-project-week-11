<template>
  <nav class="nav">
    <router-link to="/">Dashboard</router-link>

    <router-link v-if="!user" to="/auth">
      Auth
    </router-link>

    <button v-if="user" @click="handleLogout">
      Logout
    </button>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const handleLogout = async () => {
  await userStore.signOut()
  router.push('/auth')
}
</script>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.router-link-active {
  color: #42b883;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
