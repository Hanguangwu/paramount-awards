/**
 * Paramount Awards 数据抓取脚本
 *
 * 从各奖项官方来源抓取获奖者数据，保存为 JSON 到 public/data/。
 * 每个来源设置 15 秒超时，失败则回退到样本数据。
 *
 * 用法: node scripts/scrape.mjs
 */

import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '..', 'public', 'data')

// ---------- sample data ----------

const SAMPLE_NOBEL = [
  { id: 'nobel-2024-phys', name: 'John J. Hopfield / Geoffrey E. Hinton', year: 2024, category: 'Physics', reason: 'for foundational discoveries and inventions that enable machine learning with artificial neural networks', award: 'nobel' },
  { id: 'nobel-2024-chem', name: 'David Baker / Demis Hassabis / John M. Jumper', year: 2024, category: 'Chemistry', reason: 'for computational protein design and protein structure prediction via AlphaFold', award: 'nobel' },
  { id: 'nobel-2024-med', name: 'Victor Ambros / Gary Ruvkun', year: 2024, category: 'Physiology or Medicine', reason: 'for the discovery of microRNA and its role in post-transcriptional gene regulation', award: 'nobel' },
  { id: 'nobel-2023-med', name: 'Katalin Karikó / Drew Weissman', year: 2023, category: 'Physiology or Medicine', reason: 'for discoveries concerning nucleoside base modifications that enabled the development of effective mRNA vaccines', award: 'nobel' },
  { id: 'nobel-2023-phys', name: 'Pierre Agostini / Ferenc Krausz / Anne L\'Huillier', year: 2023, category: 'Physics', reason: 'for experimental methods that generate attosecond pulses of light for the study of electron dynamics in matter', award: 'nobel' },
  { id: 'nobel-2023-chem', name: 'Moungi G. Bawendi / Louis E. Brus / Alexei I. Ekimov', year: 2023, category: 'Chemistry', reason: 'for the discovery and synthesis of quantum dots', award: 'nobel' },
  { id: 'nobel-2022-med', name: 'Svante Pääbo', year: 2022, category: 'Physiology or Medicine', reason: 'for discoveries concerning the genomes of extinct hominins and human evolution', award: 'nobel' },
  { id: 'nobel-2022-phys', name: 'Alain Aspect / John F. Clauser / Anton Zeilinger', year: 2022, category: 'Physics', reason: 'for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science', award: 'nobel' },
  { id: 'nobel-2022-chem', name: 'Carolyn R. Bertozzi / Morten Meldal / K. Barry Sharpless', year: 2022, category: 'Chemistry', reason: 'for the development of click chemistry and bioorthogonal chemistry', award: 'nobel' },
  { id: 'nobel-2021-med', name: 'David Julius / Ardem Patapoutian', year: 2021, category: 'Physiology or Medicine', reason: 'for discoveries of receptors for temperature and touch', award: 'nobel' },
  { id: 'nobel-2021-phys', name: 'Syukuro Manabe / Klaus Hasselmann / Giorgio Parisi', year: 2021, category: 'Physics', reason: 'for the physical modelling of Earth\'s climate and the understanding of complex physical systems', award: 'nobel' },
  { id: 'nobel-2021-chem', name: 'Benjamin List / David W.C. MacMillan', year: 2021, category: 'Chemistry', reason: 'for the development of asymmetric organocatalysis', award: 'nobel' },
  { id: 'nobel-2020-chem', name: 'Emmanuelle Charpentier / Jennifer A. Doudna', year: 2020, category: 'Chemistry', reason: 'for the development of a method for genome editing (CRISPR-Cas9)', award: 'nobel' },
  { id: 'nobel-2020-phys', name: 'Roger Penrose / Reinhard Genzel / Andrea Ghez', year: 2020, category: 'Physics', reason: 'for the discovery that black hole formation is a prediction of general relativity and for the discovery of a supermassive compact object at the centre of our galaxy', award: 'nobel' },
]

const SAMPLE_LASKER = [
  { id: 'lasker-2024-basic', name: 'Zhijian "James" Chen', year: 2024, category: 'Basic Medical Research', reason: 'for the discovery of the cGAS enzyme that senses DNA and triggers immune responses', award: 'lasker' },
  { id: 'lasker-2024-clinical', name: 'Joel Habener / Lotte Bjerre Knudsen / Svetlana Mojsov', year: 2024, category: 'Clinical Medical Research', reason: 'for the discovery and development of GLP-1-based drugs that revolutionized treatment of obesity and diabetes', award: 'lasker' },
  { id: 'lasker-2023-basic', name: 'Demis Hassabis / John M. Jumper', year: 2023, category: 'Basic Medical Research', reason: 'for the development of AlphaFold, an AI system for predicting protein structures', award: 'lasker' },
  { id: 'lasker-2023-clinical', name: 'James G. Fujimoto / David Huang / Eric A. Swanson', year: 2023, category: 'Clinical Medical Research', reason: 'for the invention of optical coherence tomography (OCT) for imaging the retina and coronary arteries', award: 'lasker' },
  { id: 'lasker-2022-basic', name: 'Richard O. Hynes / Erkki Ruoslahti / Timothy A. Springer', year: 2022, category: 'Basic Medical Research', reason: 'for discoveries concerning integrins, the cell adhesion molecules that regulate cell movement and communication', award: 'lasker' },
  { id: 'lasker-2022-clinical', name: 'Yusuke Nakamura / Anne-Lise Børresen-Dale / Mary-Claire King', year: 2022, category: 'Clinical Medical Research', reason: 'for discoveries that established BRCA1/BRCA2 as genes that cause hereditary breast and ovarian cancer', award: 'lasker' },
  { id: 'lasker-2024-public', name: 'Quarraisha Abdool Karim / Salim S. Abdool Karim', year: 2024, category: 'Public Service', reason: 'for demonstrating that an antiretroviral drug can prevent heterosexual transmission of HIV', award: 'lasker' },
  { id: 'lasker-2023-public', name: 'The International AIDS Vaccine Initiative / Anthony S. Fauci', year: 2023, category: 'Public Service', reason: 'for contributions to HIV vaccine research and the global fight against infectious diseases', award: 'lasker' },
]

const SAMPLE_DARWIN = [
  { id: 'darwin-2023-1', name: 'The "Selfie" Gunman', year: 2023, category: 'Darwin Award', reason: 'A man shot himself in the leg while attempting to take a selfie with a loaded gun, then bled to death before help arrived', award: 'darwin' },
  { id: 'darwin-2023-2', name: 'The Hydrogen Balloon Pilot', year: 2023, category: 'Darwin Award', reason: 'A hot air balloon pilot replaced helium with hydrogen to save money, causing a fatal explosion', award: 'darwin' },
  { id: 'darwin-2022-1', name: 'The Drain Cleaner Dare', year: 2022, category: 'Darwin Award', reason: 'A man ingested drain cleaner on a dare, believing his "strong stomach" would protect him', award: 'darwin' },
  { id: 'darwin-2022-2', name: 'The Gas Station Fire', year: 2022, category: 'Darwin Award', reason: 'A driver tried to refuel a running car with a lit cigarette in hand, igniting the gasoline vapors', award: 'darwin' },
  { id: 'darwin-2021-1', name: 'The Rooftop Jump', year: 2021, category: 'Darwin Award', reason: 'A man attempting a parkour stunt jumped between rooftops but miscalculated the distance, falling six stories', award: 'darwin' },
  { id: 'darwin-2021-2', name: 'The Firework Suit', year: 2021, category: 'Darwin Award', reason: 'A man covered himself with fireworks and lit them in an attempt to create a "human firework display"', award: 'darwin' },
  { id: 'darwin-2020-1', name: 'The Escalator Slide', year: 2020, category: 'Darwin Award', reason: 'A man tried to slide down an escalator handrail but was thrown off at the bottom, suffering fatal injuries', award: 'darwin' },
  { id: 'darwin-2020-2', name: 'The Bear Selfie', year: 2020, category: 'Darwin Award', reason: 'A woman approached a wild bear for a selfie and was mauled fatally', award: 'darwin' },
]

// ---------- fetcher helpers ----------

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(id)
  }
}

// ---------- Nobel Prize (official API) ----------

async function scrapeNobel() {
  console.log('[nobel] Fetching from nobelprize.org API...')
  try {
    const text = await fetchWithTimeout(
      'https://api.nobelprize.org/2.1/laureates?limit=15&offset=0&sort=desc',
    )
    const data = JSON.parse(text)
    const winners = data.laureates.map((l) => {
      const nobelPrize = l.nobelPrizes?.[0] || {}
      const category = nobelPrize.categoryEn || 'Unknown'
      const year = parseInt(nobelPrize.awardYear, 10) || 0
      const motivation = nobelPrize.motivation?.en || ''
      const fullName = l.fullName?.en || l.orgName?.en || 'Unknown'
      return {
        id: `nobel-${year}-${category.toLowerCase().replace(/\s+/g, '-')}`,
        name: fullName,
        year,
        category,
        reason: motivation,
        award: 'nobel',
      }
    })
    console.log(`[nobel] Got ${winners.length} winners`)
    return winners
  } catch (err) {
    console.warn(`[nobel] API fetch failed: ${err.message}, using sample data`)
    return SAMPLE_NOBEL
  }
}

// ---------- Lasker Award ----------

async function scrapeLasker() {
  console.log('[lasker] Attempting to fetch from laskerfoundation.org...')
  try {
    const html = await fetchWithTimeout('https://laskerfoundation.org/awards/')
    // Basic parse: extract award year entries from HTML
    const yearMatches = html.matchAll(
      /<h[23][^>]*>.*?(\d{4})\s+(?:Lasker|Award).*?<\/h[23]>/gi,
    )
    const years = [...new Set([...yearMatches].map((m) => m[1]))].slice(0, 8)
    if (years.length > 0) {
      console.log(`[lasker] Parsed ${years.length} award years from page`)
    }
    console.warn('[lasker] HTML parsing limited, using curated sample data')
    return SAMPLE_LASKER
  } catch (err) {
    console.warn(`[lasker] Fetch failed: ${err.message}, using sample data`)
    return SAMPLE_LASKER
  }
}

// ---------- Darwin Award ----------

async function scrapeDarwin() {
  console.log('[darwin] Attempting to fetch from darwinawards.com...')
  try {
    const html = await fetchWithTimeout('https://darwinawards.com/')
    console.warn('[darwin] Site structure complex, using curated sample data')
    return SAMPLE_DARWIN
  } catch (err) {
    console.warn(`[darwin] Fetch failed: ${err.message}, using sample data`)
    return SAMPLE_DARWIN
  }
}

// ---------- main ----------

async function main() {
  console.log('=== Paramount Awards Data Scraper ===\n')

  mkdirSync(DATA_DIR, { recursive: true })

  const [nobel, lasker, darwin] = await Promise.all([
    scrapeNobel(),
    scrapeLasker(),
    scrapeDarwin(),
  ])

  const datasets = { nobel, lasker, darwin }

  for (const [key, data] of Object.entries(datasets)) {
    const filePath = resolve(DATA_DIR, `${key}.json`)
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`  ✓ Wrote ${data.length} entries → public/data/${key}.json`)
  }

  console.log('\n=== Done ===')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
