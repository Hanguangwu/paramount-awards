<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="main-content">
    <router-view />
  </main>
</template>

<style scoped>
.main-content {
  max-width: 1126px;
  margin: 0 auto;
  min-height: calc(100svh - 64px);
}
</style>
