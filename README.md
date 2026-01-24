# 🛒 Super Mall - Web Application

Super Mall is a full-stack MERN application for managing mall operations, featuring role-based access for admins and shoppers.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/harish00078/super-mall.git
cd super-mall

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Seed Database (Required for initial data)
```bash
cd backend
npm run seed
```

### 5. Run Application
Run backend:
```bash
cd backend
npm run dev
```

Run frontend:
```bash
cd frontend
npm run dev
```

## 🔐 Admin Access
To manage shops, products, and categories, use the following default credentials:

- **Email:** `admin@supermall.com`
- **Password:** `admin123`

## ✨ Features
- **Admin Dashboard:** Manage floors, categories, shops, and products.
- **Shop Directory:** Browse shops by category or floor.
- **Product Management:** Full product listings with comparison features.
- **Offer System:** Create and apply promotional offers to products.
- **Auth System:** Secure JWT-based authentication with role-based routing.

## 📂 Project Structure
- `backend/`: Node.js/Express API with MongoDB models.
- `frontend/`: React/Vite SPA.
- `DOCUMENTATION.md`: Detailed technical documentation.

## 📄 License
This project is licensed under the MIT License.
