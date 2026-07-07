<script setup lang="ts">
import type { AwardWinner, AwardType } from '../types'
import { AWARD_META } from '../types'
import WinnerCard from './WinnerCard.vue'

defineProps<{
  winners: AwardWinner[]
  award: AwardType
}>()
</script>

<template>
  <div class="winner-list">
    <WinnerCard
      v-for="winner in winners"
      :key="winner.id"
      :winner="winner"
      :color="AWARD_META[award].color"
    />
  </div>
</template>

<style scoped>
.winner-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .winner-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
