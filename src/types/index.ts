export type AwardType = 'nobel' | 'lasker' | 'darwin' | 'fields' | 'turing' | 'hugo' | 'pritzker' | 'pulitzer' | 'wolf' | 'oscar' | 'grammy'

export interface AwardWinner {
  id: string
  name: string
  year: number
  category: string
  reason: string
  award: AwardType
}

export interface AwardMeta {
  type: AwardType
  name: string
  description: string
  icon: string
  color: string
}

export const AWARD_META: Record<AwardType, AwardMeta> = {
  nobel: {
    type: 'nobel',
    name: 'Nobel Prize',
    description: '诺贝尔奖 — 表彰在物理学、化学、生理学或医学、文学、和平及经济学领域对人类作出卓越贡献的人',
    icon: '🏅',
    color: '#D4AF37',
  },
  lasker: {
    type: 'lasker',
    name: 'Lasker Award',
    description: '拉斯克奖 — 表彰在医学领域作出重大贡献的科学家，被誉为"诺贝尔奖风向标"',
    icon: '🧬',
    color: '#C41E3A',
  },
  darwin: {
    type: 'darwin',
    name: 'Darwin Award',
    description: '达尔文奖 — 表彰那些因愚蠢行为而意外死亡或失去生育能力，从而"为人类基因库做出贡献"的人',
    icon: '🤪',
    color: '#2E8B57',
  },
  fields: {
    type: 'fields',
    name: 'Fields Medal',
    description: '菲尔兹奖 — 表彰在数学领域作出杰出贡献的年轻数学家，被誉为"数学界的诺贝尔奖"',
    icon: '🧮',
    color: '#B8860B',
  },
  turing: {
    type: 'turing',
    name: 'Turing Award',
    description: '图灵奖 — 表彰在计算机领域作出持久重大技术贡献的个人，被誉为"计算机界的诺贝尔奖"',
    icon: '💻',
    color: '#1E88E5',
  },
  hugo: {
    type: 'hugo',
    name: 'Hugo Award',
    description: '雨果奖 — 表彰最佳科幻或奇幻文学作品，由世界科幻协会颁发',
    icon: '🚀',
    color: '#7B1FA2',
  },
  pritzker: {
    type: 'pritzker',
    name: 'Pritzker Prize',
    description: '普利兹克奖 — 表彰在建筑领域作出杰出贡献的建筑师，被誉为"建筑界的诺贝尔奖"',
    icon: '🏛️',
    color: '#5D4037',
  },
  pulitzer: {
    type: 'pulitzer',
    name: 'Pulitzer Prize',
    description: '普利策奖 — 表彰在新闻、文学、戏剧和音乐领域的杰出成就',
    icon: '📰',
    color: '#BF360C',
  },
  wolf: {
    type: 'wolf',
    name: 'Wolf Prize',
    description: '沃尔夫奖 — 表彰在科学和艺术领域为人类利益作出杰出贡献的国际奖项',
    icon: '🐺',
    color: '#37474F',
  },
  oscar: {
    type: 'oscar',
    name: 'Academy Awards',
    description: '奥斯卡奖 — 表彰在电影艺术与科学领域的杰出成就，由美国电影艺术与科学学院颁发',
    icon: '🎬',
    color: '#F9A825',
  },
  grammy: {
    type: 'grammy',
    name: 'Grammy Awards',
    description: '格莱美奖 — 表彰在音乐领域的卓越成就，由美国国家录音艺术与科学学院颁发',
    icon: '🎵',
    color: '#E65100',
  },
}
