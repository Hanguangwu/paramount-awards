# Paramount Awards 🏅

全球十一项顶尖奖项信息展示网站 — 从科学、技术、文学到电影、音乐、建筑，汇聚人类各领域的至高荣誉。

## 架构概览

```
paramount-awards/
├── public/
│   └── data/                   # 静态 JSON 数据
│       ├── nobel.json          # 诺贝尔奖
│       ├── lasker.json         # 拉斯克奖
│       ├── darwin.json         # 达尔文奖
│       ├── fields.json         # 菲尔兹奖
│       ├── turing.json         # 图灵奖
│       ├── hugo.json           # 雨果奖
│       ├── pritzker.json       # 普利兹克奖
│       ├── pulitzer.json       # 普利策奖
│       ├── wolf.json           # 沃尔夫奖
│       ├── oscar.json          # 奥斯卡奖
│       └── grammy.json         # 格莱美奖
├── scripts/
│   └── scrape.mjs              # 数据抓取脚本（Node.js）
├── src/
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义 & 11项奖项元数据
│   ├── router/
│   │   └── index.ts            # vue-router 路由配置（12条路由）
│   ├── views/
│   │   ├── HomeView.vue        # 首页：全部奖项概览
│   │   ├── NobelView.vue       # 诺贝尔奖详情页
│   │   ├── LaskerView.vue      # 拉斯克奖详情页
│   │   ├── DarwinView.vue      # 达尔文奖详情页
│   │   ├── FieldsView.vue      # 菲尔兹奖详情页
│   │   ├── TuringView.vue      # 图灵奖详情页
│   │   ├── HugoView.vue        # 雨果奖详情页
│   │   ├── PritzkerView.vue    # 普利兹克奖详情页
│   │   ├── PulitzerView.vue    # 普利策奖详情页
│   │   ├── WolfView.vue        # 沃尔夫奖详情页
│   │   ├── OscarView.vue       # 奥斯卡奖详情页
│   │   └── GrammyView.vue      # 格莱美奖详情页
│   ├── components/
│   │   ├── AppHeader.vue       # 顶部导航栏
│   │   ├── AwardCard.vue       # 首页奖项概览卡片
│   │   ├── WinnerList.vue      # 获奖者列表（通用）
│   │   └── WinnerCard.vue      # 单个获奖者卡片
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口
│   └── style.css               # 全局样式
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 技术栈

| 层 | 选型 | 说明 |
|---|---|---|
| UI 框架 | Vue 3 + TypeScript | Composition API + `<script setup>` |
| 构建工具 | Vite | 快速开发 & 构建 |
| 路由 | vue-router 4 | SPA 多页面导航 |
| 样式 | 纯 CSS + CSS 变量 | 响应式，支持 Light/Dark 模式 |
| 数据 | JSON 静态文件 | 通过抓取脚本生成，放在 `public/` 目录 |

## 数据来源

| 奖项 | 类别 | 数据说明 |
|---|---|---|
| 🏅 Nobel Prize | 科学 / 文学 / 和平 | [nobelprize.org API](https://api.nobelprize.org/) 官方公开 API |
| 🧬 Lasker Award | 医学 | 网页抓取 + 样本数据 |
| 🤪 Darwin Award | 奇趣 | [darwinawards.com](https://darwinawards.com/) 网页抓取 + 样本数据 |
| 🧮 Fields Medal | 数学 | 国际数学联盟 (IMU) 历年获奖者 |
| 💻 Turing Award | 计算机 | ACM 图灵奖历年获奖者 |
| 🚀 Hugo Award | 科幻/奇幻文学 | 世界科幻协会 (WSFS) 历年最佳长篇小说 |
| 🏛️ Pritzker Prize | 建筑 | 普利兹克建筑奖历年获奖者 |
| 📰 Pulitzer Prize | 新闻 / 文学 / 音乐 | 普利策奖历年获奖者 |
| 🐺 Wolf Prize | 科学 / 艺术 | 沃尔夫基金会历年获奖者 |
| 🎬 Academy Awards | 电影 | 美国电影艺术与科学学院历年最佳影片/导演 |
| 🎵 Grammy Awards | 音乐 | 美国录音学院历年年度专辑/年度制作 |

运行 `node scripts/scrape.mjs` 可重新抓取最新数据。

## 路由

| 路径 | 页面 | 内容 |
|---|---|---|
| `/` | 首页 | 全部奖项概览卡片 |
| `/nobel` | 诺贝尔奖 | 获奖者列表 |
| `/lasker` | 拉斯克奖 | 获奖者列表 |
| `/darwin` | 达尔文奖 | 获奖者列表 |
| `/fields` | 菲尔兹奖 | 获奖者列表 |
| `/turing` | 图灵奖 | 获奖者列表 |
| `/hugo` | 雨果奖 | 获奖者列表 |
| `/pritzker` | 普利兹克奖 | 获奖者列表 |
| `/pulitzer` | 普利策奖 | 获奖者列表 |
| `/wolf` | 沃尔夫奖 | 获奖者列表 |
| `/oscar` | 奥斯卡奖 | 获奖者列表 |
| `/grammy` | 格莱美奖 | 获奖者列表 |

## 设计与视觉风格

- **现代卡片风格**：明亮轻快，圆角卡片布局
- **主题色**：每项奖项独立配色，涵盖金、红、绿、蓝、紫、棕、橙等
- **响应式**：桌面多列网格，移动端单列
- **深色模式**：继承 Vite 模板原有的 `prefers-color-scheme: dark` 支持

## 开发

```bash
pnpm dev       # 启动开发服务器
pnpm build     # TypeScript 检查 + Vite 构建
pnpm preview   # 预览构建产物
```

## 数据抓取

```bash
node scripts/scrape.mjs
```

将在 `public/data/` 目录生成各奖项的 JSON 文件，每个包含获奖者的名称、年份、类别和获奖理由。
