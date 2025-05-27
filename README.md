# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books and user-submitted reviews. Features include JWT-based authentication, review management, and search functionality.

---

## Backend API Documentation

- https://documenter.getpostman.com/view/16190316/2sB2qdgfAz#96832616-c13c-4db1-af00-2d11e9a607e5

## 🚀 Features

- JWT Authentication (Signup/Login)
- Add/View Books with Pagination and Filtering
- Add/Update/Delete Reviews (one per user per book)
- Search Books by Title or Author
- MongoDB database (supports remote connections like Atlas or AWS EC2)

---

## 🛠️ Tech Stack

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT** (for Authentication)
- **dotenv** for environment variables
- **bcryptjs** for password hashing

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
npm install
```

###  Start the server
```bash
npm start
Server will run on http://localhost:5000


```

## 📌 Design Decisions
- All review operations are protected and tied to the authenticated user.

- JWT tokens are stored in-memory and passed via headers for each request.

- MongoDB is used for simplicity and scalability (e.g., works well with MongoDB Atlas/AWS).

- Routes are modular and logically separated by feature.


