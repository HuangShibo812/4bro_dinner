# 藤原（文化店）— 線上點餐系統

> 輕量、極簡、流暢的微型點餐系統，以藤原文化店真實菜單為基礎開發。

---

## 專案簡介

靈感來自餐飲業打工經驗與對周遭店家的觀察。市面上 POS 系統功能過於繁雜、月費高昂，對小店不友善。本專案目標是打造一款操作直覺、流暢，且直擊微型店家核心營運痛點的點餐系統。

**核心價值：輕量 · 極簡 · 流暢**

---

## 配色方案：藤原暖米

靈感來自藤原菜單的奶茶底色 + 深棕標題 + 金棕色區塊配色。

| 用途 | 變數 | 色票 |
|------|------|------|
| 背景色 | `theme.bg` | `#f5e8c8` |
| 卡片 / 表面色 | `theme.surface` | `#fdfaf0` |
| 主色（深棕） | `theme.primary` | `#8b5e2a` |
| 輔助色（金棕） | `theme.secondary` | `#c9a65a` |
| 主要文字 | `theme.textMain` | `#3d2010` |
| 次要文字 | `theme.textSub` | `#7a5535` |
| 可購狀態（綠） | `theme.available` | `#4a9e5c` |
| 售完狀態（灰棕） | `theme.soldOut` | `#b0a090` |

---

## 技術棧

| 類別 | 工具 |
|------|------|
| 框架 | React (JavaScript ES6+) |
| 樣式 | styled-components |
| 動畫 | framer-motion |
| UI 元件 | Ant Design |
| 圖表 | Recharts |
| 跨分頁通訊 | Broadcast Channel API |
| 資料持久化 | localStorage（模擬後端） |

---

## 核心需求

1. **看菜單、選食物（商品瀏覽）**：瀏覽商品分類與卡片，售完商品變透明且鎖死無法點擊。
2. **購物車加加減減（購物車管理）**：點餐後彈出購物車，可操作數量、刪除，即時顯示總金額。
3. **買單送出（送出訂單）**：於購物車送出後，跳轉訂單資訊頁確認金額，下單後彈窗確認並清空購物車。
4. **後台管理（管理員身分）**：管理員可新增、刪除、編輯商品狀態與細項，即時回饋至前端。
5. **現場候位與跨分頁即時劃位（亮點）**：虛擬座位表，點擊空位可線上劃位，透過 Broadcast Channel API 實現純前端跨分頁即時 UI 同步。
6. **管理者數據戰情室（亮點）**：視覺化儀表板，含 framer-motion 營業額跳動特效、Recharts 熱銷商品直條圖與尖峰時段折線圖。

---

## 菜單分類

| 分類 | category 值 | 品項數 |
|------|-------------|--------|
| 飯食類 | `rice` | 10 |
| 麵食類 | `noodle` | 3 |
| 單點 | `side` | 6 |

---

## 頁面規劃

### 路由

| 路徑 | 頁面 | 說明 |
|------|------|------|
| `/` | `HomePage.jsx` | 核心主頁，依身分分流為顧客菜單或管理者後台 |
| `/product/:productId` | `ProductPage.jsx` | 商品細節與客製化（份量、配料、數量） |
| `/cart` | `CartPage.jsx` | 購物車管理，含備註輸入與送出確認彈窗 |
| `/checkout` | `CheckoutPage.jsx` | 電子收據風格，含訂單狀態即時追蹤 |
| `/login` | `LoginPage.jsx` | 身分切換登入，判斷 customer / root |

### 版面結構速覽

**HomePage（顧客）**
```
+-----------------------------------+
|    [Header]  藤原（文化店）(登出)  |  <- Sticky 頂欄
+-----------------------------------+
|  【 現場候位狀況 】               |
|  [ A1 ] [ A2 ] [ A3 ] [ A4 ]     |  <- SeatingGrid 座位 4x3
+-----------------------------------+
|  (全部) (飯食類) (麵食類) (單點)   |  <- 橫向分類膠囊標籤
+-----------------------------------+
|  +-------------+ +-------------+ |
|  | 豬排蓋飯$100| | 雞排蓋飯$120| |  <- 2 欄商品卡片 Grid
|  | [加入購物車]| |  【已售完】  | |
|  +-------------+ +-------------+ |
+-----------------------------------+
|                           [ 🛒2 ] |  <- Fixed 懸浮購物車圓鈕
+-----------------------------------+
```

**HomePage（Root 管理者）**
```
+-----------------------------------+
|  【 今日總營業額 】               |
|     $ 15,800  (持續跳動中...)     |  <- framer-motion 數字跳動
+-----------------------------------+
|  【 當日熱門餐點 】 Recharts BarChart
|  【 尖峰時段分佈 】 Recharts LineChart
+-----------------------------------+
|  [ + 新增餐點 ]                   |
|  菜單條列管理 [編輯][上架/隱藏][刪除]
+-----------------------------------+
```

---

## 資料結構設計

### 商品原始資料 `menuData.jsx`（靜態）
```js
{ id, title, price, category, isAvailable, image }
// category: "rice" | "noodle" | "side"
```

### 購物車狀態 `cartState`（動態）
```js
[{ id, title, price, category, quantity }]
```

### 訂單紀錄 `ordersState`（動態）
```js
[{
  orderId: "ord-20260621-01",
  items: [...],
  totalPrice: 320,
  status: "pending",       // pending / completed
  createdAt: "2026-06-21 12:30"
}]
```

### 座位狀態 `seatingState`（動態 + Broadcast Channel 同步）
```js
[{ seatId: "A1", isOccupied: false, userId: null }]
```

### 身分狀態 `userStatus`（動態）
```js
{ isLoggedIn: true, role: "customer", name: "世博" }
// role: "customer" | "root"
```

---

## 資料夾結構

```
src/
├── components/
│    ├── auth/
│    │    └── AuthContext.js
│    ├── common/
│    │    ├── Header.jsx
│    │    ├── ProductCard.jsx
│    │    └── ProductGrid.jsx
│    ├── dashboard/
│    │    ├── RevenueCounter.jsx    # framer-motion 營收跳動動畫
│    │    ├── ProductBarChart.jsx   # Recharts 熱門餐點直條圖
│    │    └── TimeLineChart.jsx     # Recharts 尖峰時段折線圖
│    └── seating/
│         └── SeatingGrid.jsx       # Broadcast Channel API 座位即時同步
├── data/
│    └── menuData.jsx               # 藤原文化店 19 筆菜單資料
├── pages/
│    ├── HomePage.jsx
│    ├── ProductPage.jsx
│    ├── CartPage.jsx
│    ├── CheckoutPage.jsx
│    └── LoginPage.jsx
├── styles/
│    └── theme.js                   # 全域色票統一管理
├── App.jsx                         # React Router 路由設定
└── main.jsx                        # 專案進入點
```

---

## 目前進度清單

- [x] 系統規劃（核心需求、資料結構、頁面架構）
- [x] 初始環境建置（Vite + React 專案初始化）
- [x] 路由設定（React Router，五大頁面路徑配置）
- [x] 菜單資料建立（`menuData.jsx`，藤原文化店 19 筆）
- [x] 配色方案確認（藤原暖米色系，`theme.js`）
- [x] Header 元件（含向下滾動自動收起）
- [x] ProductCard 元件（點擊導向 ProductPage，售完鎖定）
- [x] ProductGrid 元件（依 category 篩選渲染）
- [x] 分類標籤列（CategoryNav，點擊平滑滾動至對應區塊）
- [x] 懸浮購物車圓鈕（FloatingCart，固定右下角）
- [x] customizationOptions 資料結構（飯食類 / 麵食類 / 單點）
- [x] ProductPage 靜態切版（商品圖、客製化選項、備註、數量、Sticky 加入按鈕）
- [ ] ProductPage 互動邏輯（勾選計算金額、加入購物車）
- [ ] SeatingGrid 座位元件
- [ ] CartPage 切版
- [ ] CheckoutPage 切版
- [ ] LoginPage 切版
- [ ] AuthContext 身分管理
- [ ] 購物車邏輯實作
- [ ] 訂單送出邏輯
- [ ] Broadcast Channel API 跨分頁同步
- [ ] HomePage 切版（Root 管理者後台）
- [ ] RevenueCounter（framer-motion）
- [ ] ProductBarChart（Recharts）
- [ ] TimeLineChart（Recharts）
- [ ] 後台商品 CRUD 功能
- [ ] localStorage 持久化
