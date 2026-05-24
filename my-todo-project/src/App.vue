<template>
  <section>
    <Nav />
    <router-view />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useUserStore } from './store/user'
import Nav from './components/Nav.vue'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  await userStore.fetchUser()

  if (!user.value) {
    router.push('/auth')
  } else {
    router.push('/')
  }
})
</script>
