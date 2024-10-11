
# **Quiz - Backend**

## **Table of Contents**
1. [Overview](#overview)
2. [Project Setup](#project-setup)
3. [Environment Variables](#environment-variables)
4. [Setting Up MongoDB](#setting-up-mongodb)
5. [Database Models](#database-models)
6. [APIs](#apis)
   - [User Authentication](#user-authentication)
   - [Quiz Management](#quiz-management)
   - [Result Management](#result-management)
7. [Middleware](#middleware)
8. [Start the application](#8-start-the-application)


---

## **1. Overview**

The **Quiz Application** is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. It allows users to register, log in, create and take quizzes, and view their results. The application uses JWT (JSON Web Tokens) for secure user authentication and authorization.

---

## **2. Project Setup**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shubhu121/quiz-backend.git
   cd quiz-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables** in a `.env` file (see the [Environment Variables](#environment-variables) section).

4. **Run the Application:**
   ```bash
   npm start
   ```
   The application will start on `http://localhost:5000`.

---



## **3. Environment Variables**

The application uses environment variables defined in a `.env` file. Below are the required variables:

- **PORT**: The port number the server will run on (default: 5000).
- **MONGO_URI**: The MongoDB connection string.
- **JWT_SECRET**: A secret key used for JWT token generation.

### Example `.env` File:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## **4. Setting Up MongoDB**

The application uses **MongoDB** as its database. You can set up MongoDB either locally or through **MongoDB Atlas** (a cloud-based MongoDB service). Below are instructions for both methods:


### Setting Up MongoDB Atlas (Cloud Database)

1. **Create a MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.

2. **Create a Cluster**:
   - Set up a new cluster (free tier is available) and choose your preferred region.

3. **Configure Cluster Security**:
   - **Whitelist IP Address**: Go to **Network Access** and add your IP address.
   - **Create a Database User**: In **Database Access**, create a user with a username and password for your application.

4. **Get the MongoDB Connection String**:
   - Go to your cluster, click **Connect**, and select **Connect your application**. Copy the connection string.

5. **Update Environment Variables**:
   - In your `.env` file, update the `MONGO_URI` with the connection string you copied:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/quiz-app?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials and replace `quiz-app` with your database name.

6. **Test the Connection**:
   - Make sure your MongoDB Atlas instance is up and running. The application will connect to it when you start the server.

---

## **5. Database Models**

### **User Model (`models/User.js`)**
Represents a user in the system.
- `username`: String (unique)
- `password`: String (hashed)
- `email`: String (unique)

### **Quiz Model (`models/Quiz.js`)**
Represents a quiz created by a user.
- `title`: String
- `questions`: Array of objects with:
  - `questionText`: String
  - `options`: Array of four strings
  - `correctAnswer`: Number (index of the correct option)
- `createdBy`: Reference to the `User` who created the quiz

### **Result Model (`models/Result.js`)**
Represents a user’s quiz attempt result.
- `user`: Reference to the `User`
- `quiz`: Reference to the `Quiz`
- `score`: Number (correct answers)
- `total`: Number (total questions)
- `date`: Date (default: current date)

---

## **6. APIs**

### **User Authentication**

1. **Register**
   - **POST** `/api/auth/register`
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "username": "shubhu121",
       "password": "password123",
       "email": "sktesting121@gmail.com"
     }
     ```
   - **Response**:
     - Success: `201 Created`
     - Error: `500 Internal Server Error`

2. **Login**
   - **POST** `/api/auth/login`
   - **Description**: Logs in a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "username": "john_doe",
       "password": "password123"
     }
     ```
   - **Response**:
     - Success: `200 OK` (returns a token)
     - Error: `401 Unauthorized`

### **Quiz Management**

1. **Create a Quiz**
   - **POST** `/api/quizzes`
   - **Description**: Creates a new quiz (requires authentication).
   - **Request Header**: `Authorization: Bearer <token>`
   - **Request Body**:
     ```json
     {
       "title": "Math Quiz",
       "questions": [
         {
           "questionText": "What is 2 + 2?",
           "options": ["1", "2", "3", "4"],
           "correctAnswer": 3 //(index of option array)
         }
       ]
     }
     ```
   - **Response**:
     - Success: `201 Created`
     - Error: `500 Internal Server Error`

2. **Get All Quizzes**
   - **GET** `/api/quizzes`
   - **Description**: Retrieves all quizzes.
   - **Response**:
     - Success: `200 OK` (returns an array of quizzes)
     - Error: `500 Internal Server Error`

3. **Get Quiz Details**
   - **GET** `/api/quizzes/:id`
   - **Description**: Retrieves details of a specific quiz by ID.
   - **Response**:
     - Success: `200 OK` (returns quiz details)
     - Error: `404 Not Found`

4. **Take a Quiz**
   - **POST** `/api/quizzes/:id/attempt`
   - **Description**: Allows a user to attempt a quiz (requires authentication).
   - **Request Header**: `Authorization: Bearer <token>`
   - **Request Body**:
     ```json
     {
       "answers": [0, 2, 1]
     }
     ```
   - **Response**:
     - Success: `200 OK` (returns score and total)
     - Error: `500 Internal Server Error`

### **Result Management**

1. **View Results**
   - **GET** `/api/results`
   - **Description**: Fetches the quiz results for the authenticated user.
   - **Request Header**: `Authorization: Bearer <token>`
   - **Response**:
     - Success: `200 OK` (returns an array of results)
     - Error: `500 Internal Server Error`

---

## **7. Middleware**

### **Auth Middleware (`middleware/authMiddleware.js`)**
- Ensures that

 only authenticated users can access certain routes.
- Validates the JWT token passed in the `Authorization` header.
- Adds the `user` object to the request if the token is valid.

---
 
## **8. Start the Application**
   ```bash
   npm start
   ```

