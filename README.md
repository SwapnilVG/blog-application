# Blog Application API

## Overview

This project is a blog application API built using Node.js, Express, and MongoDB. It includes features for user authentication, post management, and comment handling. The API uses JWT for authentication and bcrypt for password hashing.

## Features

- **User Authentication:**
  - Register a new user
  - Log in and receive a JWT token

- **Post Management:**
  - Create, read, update, and delete posts

- **Comment Management:**
  - Create, read, update, and delete comments

## Technologies

- Node.js
- Express
- MongoDB
- JWT (jsonwebtoken)
- bcryptjs
- Chai & Chai-HTTP for testing

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SwapnilVG/blog-application.git

2. Navigate to the project root:

    ```bash
    cd blog-application
    ```

3. Install dependencies :

    ```bash
    npm install
    ```

### Running the App

1. Start the server (backend):

    ```bash
    npm run dev
    ```

   The server will be running at [http://localhost:3000](http://localhost:3000).


## Sample Environment File 

Create a `.env` file in the `server` folder with the following content:

```env
PORT = 
MONGO_URI = 
JWT_SECRET = 
```



