<template>
  <LoginPage v-if="!isGuest" @guest="isGuest = true" />
  <DashboardPage v-else @logout="isGuest = false" />
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import DashboardPage from './components/DashboardPage.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    DashboardPage
  },
  data() {
    return {
      isGuest: false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
