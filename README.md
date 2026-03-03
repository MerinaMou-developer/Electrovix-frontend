## Electrovix Frontend – Smart E‑commerce UI

This `frontend` is a modern React + Redux single‑page application for an electronics e‑commerce store, designed to feel like a real production shop with smart filtering, admin tools, and an integrated AI shopping assistant.

It connects to the backend at `https://electrovix-backend.onrender.com` (configurable via the `REACT_APP_BACKEND_URL` environment variable, see `src/config.js`).

---

### 🌍 Live Demo

- **Deployed app**: [`https://electrovix.vercel.app/`](https://electrovix.vercel.app/)

---

### 🧰 Tech Stack

- **Frontend framework**: React 18 (`create-react-app`)
- **Routing**: `react-router-dom`
- **State management**: Redux + `redux-thunk`
- **Styling**: TailwindCSS‑style utility classes (via PostCSS/Tailwind setup)
- **HTTP client**: Axios
- **Notifications**: `react-toastify`
- **Tooling**: `react-scripts`, Jest + React Testing Library

---

### ✨ Key Features

- **Beautiful home page**
  - Hero/product carousel with highlighted deals.
  - “Shop by Category” and brand sections to quickly jump into products.
  - “Why shop with us” and newsletter components to build trust and engagement.

- **Smart product discovery**
  - Keyword search and multiple filter modes: best seller, featured, new, discount.
  - Category, brand, and price range filters that update the URL query string.
  - Pagination for large product lists.

- **Complete shopping flow**
  - Product detail page with rating, pricing, and add‑to‑cart.
  - Cart page with quantity management.
  - Shipping, payment, and place‑order steps with visual checkout progress.
  - Order detail screen to review placed orders.

- **User account experience**
  - Register, login, and account activation via token.
  - Profile screen to manage user information.

- **Admin dashboard**
  - User list and user edit screens.
  - Product list and product edit screens.
  - Order list for monitoring store activity.

- **AI shopping assistant**
  - Floating AI chat widget (`AIChatWidget` + `AIChatModal`) accessible from any page.
  - Designed to help users find products and answer questions in a conversational way.

- **Modern tech stack**
  - React 18 with `react-router-dom` for routing.
  - Global state with Redux and `redux-thunk`.
  - TailwindCSS‑style utility classes for a clean, responsive UI.
  - Toast notifications for feedback (`Toast` component).

---

### 🧱 Project Structure (high‑level)

- **`src/App.js`** – Main app shell, routing, layout, and global components (`Header`, `Footer`, `Toast`, `AIChatWidget`).
- **`src/screens`** – Page‑level screens (home, products, product details, cart, auth, checkout, orders, admin screens, about, contact).
- **`src/components`** – Reusable building blocks like header, footer, filters, carousels, product cards, pagination, AI chat components, etc.
- **`src/actions` / `src/reducers` / `src/constants`** – Redux logic for products, cart, users, orders, and AI.
- **`src/config.js`** – Backend API base URL configuration.

---

### 📦 Installation & Local Setup

1. **Clone the repository** (adjust the URL to your repo):

   ```bash
   git clone git@github.com:MerinaMou-developer/Electrovix-frontend.git
   cd <your-repo>/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

The app will hot‑reload as you edit code.

---

### 🔧 Environment Configuration

- **Backend URL**
  - By default, the app uses  
    `https://electrovix-backend.onrender.com`
  - To point to a different backend (for example, local development), set:

    ```bash
    REACT_APP_BACKEND_URL=http://127.0.0.1:8000
    ```

    in your environment and restart the dev server.

---

### 🧪 Available Scripts

- **`npm start`** – Run the app in development mode.
- **`npm run build`** – Create an optimized production build.
- **`npm test`** – Run tests (if/when added).

---

### 🌐 Production Deployment

- **Build for production**:

  ```bash
  cd frontend
  npm install   # if not already done
  npm run build
  ```

  This generates an optimized `build` directory.

- **Deploy options**:
  - Any static hosting (Vercel, Netlify, GitHub Pages, etc.) by serving the `build` folder.  
    The current live deployment is on Vercel at [`https://electrovix.vercel.app/`](https://electrovix.vercel.app/).
  - Behind a backend server (e.g., served by your Electrovix backend) by configuring it to serve the `build` directory as static files.

Make sure your production environment exposes `REACT_APP_BACKEND_URL` so the frontend talks to the correct backend API.

---

### 💡 How to Use This Frontend

1. **Browse** the home page to explore trending, discounted, and categorized products.
2. **Filter** by category, brand, price, and sort type to quickly narrow down what you want.
3. **View details** on a product page and add it to your cart.
4. **Checkout** through shipping, payment, and order placement steps.
5. **Sign in** or **register**, then manage your profile and view your orders.
6. If you’re an admin, **manage users, products, and orders** through the admin routes.
7. **Open the AI button** at the bottom‑right corner to chat with the AI assistant for guidance and product help.

This README is focused on what your frontend does and how to run it, so visitors immediately understand the value of your Electrovix UI.
