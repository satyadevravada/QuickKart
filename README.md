# QuickKart 🛒

**QuickKart** is a full-stack e-commerce web application built with React and Tailwind CSS on the frontend, and Express, Node.js, and MySQL on the backend. It features JWT-based authentication, secure user sessions, product listings, cart management, and order placement.



## 🌐 Tech Stack

### Frontend

* **React** for UI development
* **Tailwind CSS** for utility-first styling
* **Fetch** for HTTP requests to backend API
* **React Router** for client-side routing

### Backend

* **Node.js** with **Express.js** for RESTful API
* **MySQL** as the relational database
* **JWT** for user authentication and secure sessions


## 📁 Project Structure

```
QuickKart/
├── client/           # React frontend application
├── server/           # Express backend API
├── db/               # Database setup (SQL scripts or ORM models)
├── .gitignore
├── LICENSE
└── README.md
```



## ⚙️ Features

* **User Authentication**

  * JWT-based login/signup
  * Protected routes for carts and order management

* **Product Catalog**

  * Dynamic product listing
  * Product details pages

* **Cart & Checkout**

  * Add/update/remove items in cart
  * Checkout to create orders

* **Order Management**

  * Order creation and retrieval
  * Admin (future) could manage products and orders



## 💡 Getting Started

### Prerequisites

* Node.js (v14+)
* MySQL server
* npm or yarn

### 1. Clone the Repo

```bash
git clone https://github.com/satyadevravada/QuickKart.git
cd QuickKart
```

### 2. Setup Backend (`server/`)

1. Navigate:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (`.env`):

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=quickkart
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Initialize the database:

   * Run SQL scripts in `db/`.

5. Start server:

   ```bash
   npm run dev       
   ```

### 3. Setup Frontend (`client/`)

1. Navigate:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start frontend:

   ```bash
   npm start
   ```

4. Visit [http://localhost:3000](http://localhost:3000) to use QuickKart!



## 🛠️ Usage

* **Sign up / Log in** as a user.
* **Browse products**, view details.
* **Add to cart**, modify quantities.
* **Checkout** to place an order.



## 🧹 API Endpoints

| Endpoint             | Method | Description                     |
| -------------------- | ------ | ------------------------------- |
| `/api/auth/register` | POST   | Register a new user             |
| `/api/auth/login`    | POST   | Log in and receive JWT token    |
| `/api/products`      | GET    | List all products               |
| `/api/products/:id`  | GET    | Fetch product details           |
| `/api/cart`          | POST    | Get current user’s cart         |
| `/api/cart`          | POST   | Add/update product in cart      |
| `/api/cart/:itemId`  | DELETE | Remove item from cart           |
| `/api/orders`        | POST   | Create a new order              |
| `/api/orders/user`   | POST    | Get orders for the current user |



## 🛡️ Authentication & Security

* Users receive a **JWT token** after login.
* Token is stored in localStorage.
* Protected routes require a valid token in the `Authorization` header (e.g., `Bearer <token>`).
* Passwords are **hashed** using bcrypt.



## 🚀 Future Enhancements

* **Admin dashboard** to manage products & orders
* **Payment integration** (Stripe, PayPal)

---

## 📄 License

QuickKart is released under the **MIT License** — see the `LICENSE` file for details.

