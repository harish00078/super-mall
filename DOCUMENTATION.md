# Super Mall Web Application Documentation

## 1. Project Overview
**Super Mall** is a comprehensive full-stack web application designed to manage the operations of a large shopping mall. It serves as a central platform for shop management, product listings, promotional offers, and floor navigation. The application supports two primary user roles: **Admin** (mall management) and **User** (shoppers).

## 2. Technology Stack

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (using Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Security:** BcryptJS (password hashing)
*   **Logging:** Winston
*   **CORS:** Cross-Origin Resource Sharing enabled

### Frontend
*   **Library:** React.js (v18)
*   **Build Tool:** Vite
*   **Routing:** React Router DOM (v6)
*   **HTTP Client:** Axios
*   **State Management:** Context API (AuthContext)
*   **UI Components:** React Icons, React Hot Toast (notifications)
*   **Styling:** CSS Modules / Standard CSS

## 3. Architecture & Structure

The application follows a standard **MERN (MongoDB, Express, React, Node)** architecture.

### Directory Structure
```
super-mall/
├── backend/                # Server-side logic
│   ├── models/             # Database schemas (User, Shop, Product, etc.)
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & Logging middleware
│   ├── seed.js             # Database seeder script
│   └── server.js           # Entry point
│
└── frontend/               # Client-side application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # Global state (Auth)
    │   ├── pages/          # Application views/routes
    │   └── services/       # API integration (Axios)
    └── vite.config.js      # Vite configuration
```

## 4. Database Schema
The data is modeled using Mongoose schemas located in `backend/models/`:

*   **User:** Stores user credentials and roles (`user`, `admin`).
*   **Floor:** Represents physical mall levels (e.g., Ground Floor, 1st Floor).
*   **Category:** Categorizes shops and products (e.g., Electronics, Fashion).
*   **Shop:** Stores shop profiles, linked to `Floor` and `Category`.
*   **Product:** Items available in shops, linked to `Shop` and `Category`.
*   **Offer:** Promotional deals linked to `Shop` and applied to `Products`.

## 5. API Endpoints
Base URL: `/api`

| Resource | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/auth/register` | Register a new user |
| | POST | `/auth/login` | Login user & get JWT |
| | GET | `/auth/me` | Get current user profile |
| **Shops** | GET | `/shops` | List all shops |
| | GET | `/shops/:id` | Get shop details |
| | GET | `/shops/floor/:floorId` | Get shops by floor |
| **Products** | GET | `/products` | List all products |
| | GET | `/products/compare` | Compare products |
| **Offers** | POST | `/offers/:id/apply` | Apply offer to products |

*(Note: Full CRUD operations available for Admin on Shops, Products, Categories, Floors, and Offers)*

## 6. Setup & Installation

### Prerequisites
*   Node.js (v14+)
*   MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/harish00078/super-mall.git
    cd super-mall
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in `backend/` and add your MongoDB URI and JWT Secret.
    *   Example `.env`:
        ```env
        MONGO_URI=mongodb://localhost:27017/supermall
        JWT_SECRET=your_super_secret_key
        PORT=5000
        ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Seed the Database (Optional but Recommended):**
    This will populate the database with initial data (Floors, Categories, Shops, Products) and create the default Admin account.
    ```bash
    cd backend
    npm run seed
    ```

2.  **Start Backend Server:**
    ```bash
    cd backend
    npm run dev  # Runs with nodemon
    ```

3.  **Start Frontend Client:**
    ```bash
    cd frontend
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

## 7. Admin Credentials
The application comes with a pre-configured Admin account created by the seed script.

### 🔐 Admin Login Details
Use these credentials to access the Admin Dashboard:

*   **Email:** `admin@supermall.com`
*   **Password:** `admin123`

> **Security Warning:** Please change the admin password immediately after your first login in a production environment.

## 8. Key Features
*   **Role-Based Access Control:** Secure admin routes for managing mall data.
*   **Interactive Maps:** Browse shops by Floor.
*   **Product Comparison:** Compare features and prices of multiple products.
*   **Offer Management:** Dynamic application of discounts to products.
*   **Soft Deletes:** `isActive` flag ensures data integrity for removed items.
