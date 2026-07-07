<script setup lang="ts">
import type { AwardMeta } from '../types'

defineProps<{
  meta: AwardMeta
  count: number
}>()
</script>

<template>
  <router-link :to="`/${meta.type}`" class="award-card" :style="{ '--award-color': meta.color }">
    <div class="card-icon">{{ meta.icon }}</div>
    <h2 class="card-title">{{ meta.name }}</h2>
    <p class="card-desc">{{ meta.description }}</p>
    <div class="card-footer">
      <span class="card-count">{{ count }} winners</span>
      <span class="card-arrow">→</span>
    </div>
  </router-link>
</template>

<style scoped>
.award-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
}

.award-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--award-color);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 12px;
  line-height: 1.3;
}

.card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
  margin: 0 0 24px;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.card-count {
  font-size: 13px;
  font-weight: 500;
  color: var(--award-color);
}

.card-arrow {
  font-size: 20px;
  color: var(--award-color);
  transition: transform 0.2s;
}

.award-card:hover .card-arrow {
  transform: translateX(4px);
}
</style>
