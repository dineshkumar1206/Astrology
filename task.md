# Integration Tasks: Admin Dashboard & Dynamic Products

## Phase 1: Admin Dashboard & Dynamic Products

- `[x]` Update backend `.env` with admin credentials
- `[x]` Update backend `routes/auth.js` to use env credentials & disable registration
- `[x]` Create backend Product model (`Product.js`)
- `[x]` Create backend product routes with seed data (`routes/products.js`)
- `[x]` Mount products routes in backend `index.js`
- `[x]` Delete frontend `Signup.jsx` page
- `[x]` Update frontend `Login.jsx` to remove signup links & navigate to dashboard
- `[x]` Update frontend `Navbar.jsx` to show Dashboard link if logged in
- `[x]` Update frontend `App.jsx` to register `/dashboard` & remove `/signup`
- `[x]` Create frontend `Dashboard.jsx` (Crystals CMS with cards layout & Add/Edit Form)
- `[x]` Update frontend `Crystals.jsx` to fetch products dynamically
- `[x]` Verify build & database integration

## Phase 2: Drag & Drop Reordering

- `[x]` Add `order` field to backend `Product` & `Category` models
- `[x]` Add reorder endpoints (`POST /api/products/reorder`, `POST /api/categories/reorder`)
- `[x]` Sort products/categories by `order` in backend queries
- `[x]` Frontend: drag & drop reordering for categories (service + crystal) in `ControlDesk.jsx`
- `[x]` Frontend: drag & drop reordering for products in `ControlDesk.jsx`
- `[x]` Frontend: sort `Products.jsx` sections & items by category/product order
- `[ ]` Remove unused `@hello-pangea/dnd` dependency (implementation uses native HTML5 drag & drop)
- `[ ]` Verify build & reorder persistence
