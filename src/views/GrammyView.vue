<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AwardWinner } from '../types'
import { AWARD_META } from '../types'
import WinnerList from '../components/WinnerList.vue'

const winners = ref<AwardWinner[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/data/grammy.json')
    winners.value = await res.json()
  } catch (e) {
    console.error('Failed to load Grammy data', e)
  } finally {
    loading.value = false
  }
})

const meta = AWARD_META.grammy
</script>

<template>
  <div class="award-page">
    <div class="page-header" :style="{ '--award-color': meta.color }">
      <span class="page-icon">{{ meta.icon }}</span>
      <div>
        <h1 class="page-title">{{ meta.name }}</h1>
        <p class="page-desc">{{ meta.description }}</p>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <WinnerList v-else-if="winners.length" :winners="winners" award="grammy" />
    <p v-else class="empty">No data available.</p>
  </div>
</template>

<style scoped>
.award-page {
  padding: 32px 24px 64px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 3px solid var(--award-color);
}

.page-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--text-h);
}

.page-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
  margin: 0;
}

.loading,
.empty {
  text-align: center;
  padding: 64px 0;
  font-size: 16px;
  color: var(--text);
}

@media (max-width: 640px) {
  .award-page {
    padding: 24px 16px 48px;
  }
  .page-header {
    flex-direction: column;
    gap: 12px;
  }
  .page-title {
    font-size: 26px;
  }
}
</style>
