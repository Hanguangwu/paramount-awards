<script setup lang="ts">
import type { AwardWinner } from '../types'

const props = defineProps<{
  winner: AwardWinner
  color: string
}>()
</script>

<template>
  <div class="winner-card" :style="{ '--award-color': color }">
    <div class="card-top">
      <span class="year-badge">{{ winner.year }}</span>
      <span class="category-tag">{{ winner.category }}</span>
    </div>
    <h3 class="winner-name">{{ winner.name }}</h3>
    <p class="winner-reason">{{ winner.reason }}</p>
  </div>
</template>

<style scoped>
.winner-card {
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.winner-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  border-color: var(--award-color);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.year-badge {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  background: var(--award-color);
  color: #fff;
}

.category-tag {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: var(--accent-bg);
  color: var(--accent);
}

.winner-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 8px;
  line-height: 1.4;
}

.winner-reason {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
  margin: 0;
}
</style>
