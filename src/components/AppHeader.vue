<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/nobel', label: 'Nobel Prize' },
  { path: '/lasker', label: 'Lasker Award' },
  { path: '/darwin', label: 'Darwin Award' },
  { path: '/fields', label: 'Fields Medal' },
  { path: '/turing', label: 'Turing Award' },
  { path: '/hugo', label: 'Hugo Award' },
  { path: '/pritzker', label: 'Pritzker Prize' },
  { path: '/pulitzer', label: 'Pulitzer Prize' },
  { path: '/wolf', label: 'Wolf Prize' },
  { path: '/oscar', label: 'Oscars' },
  { path: '/grammy', label: 'Grammys' },
]
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon">🏅</span>
        <span class="logo-text">Paramount Awards</span>
      </router-link>
      <nav class="nav-links">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="{ active: route.path === link.path }"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
}

.header-inner {
  max-width: 1126px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-h);
}

.logo-icon {
  font-size: 24px;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-links a {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  transition: background 0.2s, color 0.2s;
}

.nav-links a:hover {
  background: var(--accent-bg);
  color: var(--text-h);
}

.nav-links a.active {
  background: var(--accent-bg);
  color: var(--accent);
}

@media (max-width: 640px) {
  .header-inner {
    padding: 0 16px;
    height: 56px;
  }
  .logo-text {
    display: none;
  }
  .nav-links a {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>
