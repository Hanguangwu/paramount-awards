<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AwardWinner, AwardType } from '../types'
import { AWARD_META } from '../types'
import AwardCard from '../components/AwardCard.vue'

const counts = ref<Record<AwardType, number>>({
  nobel: 0,
  lasker: 0,
  darwin: 0,
  fields: 0,
  turing: 0,
  hugo: 0,
  pritzker: 0,
  pulitzer: 0,
  wolf: 0,
  oscar: 0,
  grammy: 0,
})

onMounted(async () => {
  const results = await Promise.allSettled([
    fetch('/data/nobel.json').then((r) => r.json()),
    fetch('/data/lasker.json').then((r) => r.json()),
    fetch('/data/darwin.json').then((r) => r.json()),
    fetch('/data/fields.json').then((r) => r.json()),
    fetch('/data/turing.json').then((r) => r.json()),
    fetch('/data/hugo.json').then((r) => r.json()),
    fetch('/data/pritzker.json').then((r) => r.json()),
    fetch('/data/pulitzer.json').then((r) => r.json()),
    fetch('/data/wolf.json').then((r) => r.json()),
    fetch('/data/oscar.json').then((r) => r.json()),
    fetch('/data/grammy.json').then((r) => r.json()),
  ])
  ;(['nobel', 'lasker', 'darwin', 'fields', 'turing', 'hugo', 'pritzker', 'pulitzer', 'wolf', 'oscar', 'grammy'] as AwardType[]).forEach((key, i) => {
    if (results[i].status === 'fulfilled') {
      counts.value[key] = (results[i] as PromiseFulfilledResult<AwardWinner[]>).value.length
    }
  })
})
</script>

<template>
  <div class="home">
    <section class="hero-section">
      <h1 class="hero-title">Paramount Awards</h1>
      <p class="hero-subtitle">
        探索全球顶尖奖项的获奖者与荣誉 — 从科学、数学到艺术、娱乐
      </p>
    </section>

    <section class="cards-grid">
      <AwardCard
        v-for="(meta, key) in AWARD_META"
        :key="key"
        :meta="meta"
        :count="counts[key as AwardType]"
      />
    </section>
  </div>
</template>

<style scoped>
.home {
  padding: 48px 24px 64px;
}

.hero-section {
  text-align: center;
  margin-bottom: 48px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1.5px;
  margin: 0 0 16px;
  background: linear-gradient(135deg, #D4AF37 0%, #C41E3A 50%, #2E8B57 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text);
  margin: 0;
  line-height: 1.6;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .home {
    padding: 32px 16px 48px;
  }
  .hero-title {
    font-size: 32px;
  }
}
</style>
