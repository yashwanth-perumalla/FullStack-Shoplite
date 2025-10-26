# Full Stack Projects Collection
A set of full-stack TypeScript projects showcasing frontend–backend integration using modern frameworks.

---

## 1. ShopLite
**A minimal e-commerce web app built with Next.js (frontend) and NestJS (backend).**

### Tech Stack
- **Frontend:** Next.js 14, TypeScript, Zustand for state
- **Backend:** NestJS 10, TypeScript, node-fetch (for API proxy)
- **Data Source:** FakeStoreAPI (https://fakestoreapi.com)
- **Ports:** Frontend → 3002, Backend → 5002

### Structure
ShopLite/
├── backend/
│ ├── src/
│ │ ├── main.ts
│ │ ├── modules/
│ │ │ ├── app.module.ts
│ │ │ ├── root.controller.ts
│ │ │ └── products/
│ │ │ ├── products.module.ts
│ │ │ ├── products.controller.ts
│ │ │ └── products.service.ts
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── app/
│ │ │ ├── page.tsx
│ │ │ ├── cart/page.tsx
│ │ │ └── layout.tsx
│ │ └── store/cart.ts
│ └── package.json
└── package.json (root)

### Run the App
```powershell
# at project root
npm install
npm run dev

Starts both:
🟢 Backend → http://localhost:5002

🟢 Frontend → http://localhost:3002



