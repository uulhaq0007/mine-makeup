# Mine Makeup — MERN Makeup Marketplace

A full-stack makeup e-commerce site with two roles:
- **User**: browse, search, add to cart, place orders.
- **Seller**: create/update/delete their own products, view their orders.

Stack: **React (Vite) + Tailwind CSS** on the frontend, **Node.js + Express + MongoDB (Mongoose) + JWT** on the backend.

## Quick start

### 1. Backend
```bash
cd backend
cp .env.example .env        # fill in MONGO_URI + JWT_SECRET
npm install
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

### Test it
1. Register a **seller** account, log in, open Seller Dashboard, add products.
2. Register a **user** account, log in, add items to cart, place order.

## Folder layout
```
mine-makeup/
├── backend/   Express API + Mongo models
└── frontend/  React + Tailwind SPA
```
