
# E-Commerce API Server

This is a backend API server for managing an e-commerce platform. The server supports basic CRUD operations for customers, products, and orders, as well as top product analysis. It also includes functionality for refreshing data from CSV files.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14.0 or later)  
  Download and install Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)
  
- **MongoDB**  
  You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or run MongoDB locally. Follow the [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/).

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ecommerce-api-server.git
cd ecommerce-api-server
```

### 2. Install dependencies
Make sure you're in the root directory of the project, then install the required dependencies:

```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add your MongoDB URI and port number:

```ini
MONGO_URI=mongodb://localhost:27017/ecommerce_db
PORT=5000
```

### 4. Start the server
Once dependencies are installed and the `.env` file is set up, you can run the server:

```bash
npm start
```

The server will be running on `http://localhost:5000/api/analysis`.

## API Documentation

### List of APIs

**1. `/top-products/:start/:end`**  
- **Method:** GET  
- **Body (Request):**  
  ```json
  { "start": "2025-01-01", "end": "2025-12-31" }
  ```  
- **Sample Response:**  
  ```json
  [{ "product": "P001", "totalQuantity": 5, "category": "Electronics" }]
  ```  
- **Description:** Get top-selling products in a date range.

---

**2. `/top-products/:start/:end/:category`**  
- **Method:** GET  
- **Body (Request):**  
  ```json
  { "start": "2025-01-01", "end": "2025-12-31", "category": "Electronics" }
  ```  
- **Sample Response:**  
  ```json
  [{ "product": "P001", "totalQuantity": 5 }]
  ```  
- **Description:** Get top-selling products by category.

---

**3. `/top-products/by-region/:start/:end/:region`**  
- **Method:** GET  
- **Body (Request):**  
  ```json
  { "start": "2025-01-01", "end": "2025-12-31", "region": "North" }
  ```  
- **Sample Response:**  
  ```json
  [{ "product": "P001", "totalQuantity": 5 }]
  ```  
- **Description:** Get top-selling products by region.

---

**4. `/refresh-data`**  
- **Method:** GET  
- **Body (Request):** N/A  
- **Sample Response:**  
  ```json
  { "message": "Data Loaded Successfully" }
  ```  
- **Description:** Refresh data from CSV.
