# 🍕 Pizza Palace

A full-stack Pizza Ordering Web Application built using the MERN Stack. The application allows customers to browse pizzas, add items to the cart, place orders, and track orders. Admins can manage pizzas and update order statuses.

## 🚀 Live Demo

Frontend: [https://pizza-palace-ebon.vercel.app/]

Backend: [https://pizza-palace-kz98.onrender.com]

## 📌 Features

### Customer Features

* User Registration
* User Login
* View Featured Pizzas
* Browse Pizza Menu
* View Pizza Details
* Add to Cart
* Update Cart Quantity
* Remove Items from Cart
* Checkout
* Place Orders
* View Order History
* Update Profile

### Admin Features

* Admin Login
* Add New Pizza
* Edit Pizza
* Delete Pizza
* View All Orders
* Update Order Status

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render

## 📂 Project Structure

pizza-palace/

├── frontend/

│ ├── src/

│ ├── components/

│ ├── pages/

│ ├── redux/

│ └── App.jsx

│

├── backend/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── .env

│ └── server.js

## 🔐 Authentication

* JWT Token Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Admin Access Control

## 📊 Database Collections

### Users

* name
* email
* password
* role

### Pizzas

* name
* category
* description
* price
* image

### Orders

* name
* phone
* address
* city
* pincode
* items
* subtotal
* delivery
* totalPrice
* paymentMethod
* status
* createdAt

## Admin Credentials

Email: [admin@gmail.com]

Password: admin123

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/admin-login
* GET /api/auth/profile
* PUT /api/auth/profile

### Pizza

* GET /api/pizzas
* POST /api/pizzas/add
* PUT /api/pizzas/update/:id
* DELETE /api/pizzas/:id

### Orders

* POST /api/orders/place
* GET /api/orders
* GET /api/orders/admin/all
* PUT /api/orders/admin/update/:id

## Future Enhancements

* Online Payment Integration
* Order Tracking
* Search & Filtering
* Admin Role Management
* Store Admin in MongoDB
* Automated Testing

## Author

G.Muniammal

Full Stack Web Developer

Skills: HTML5, CSS3, Tailwind CSS, JavaScript, React.js, Redux Toolkit, Node.js, Express.js, MongoDB, Firebase, Razorpay
