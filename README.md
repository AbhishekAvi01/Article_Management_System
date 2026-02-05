 Project Overview
The goal of this project was to create a robust engine that handles articles and categories dynamically. It’s not just a basic CRUD app; it includes advanced features like filtering and a data-rich dashboard statistics API.


 Features I've Implemented
1) Article Management: Full CRUD (Create, Read, Update, Delete) for articles.

2) Smart Categories: Articles are linked to categories. You can filter articles by simply passing a category slug in the URL.

3) Admin Dashboard Stats: A specialized endpoint that calculates total articles, published vs. draft counts, and a breakdown of articles per category using MongoDB Aggregation.

4) Clean Architecture: Logic is separated into Routes, Controllers, and Models. No "spaghetti code."

5) Security First: Integrated Helmet for secure HTTP headers and CORS for cross-origin resource sharing.


How to get this running?
1. Installation
First, extract the files and install the necessary packages:
npm install

2. Environment Setup
Create a file named .env in the root folder (where server.js is) and add your details:
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string


3. Start the Engine
npm start


API Reference

Articles
Method,    Endpoint,            What it does
GET,      /api/articles,        Fetches all articles (Tip: Use ?category=slug to filter)
POST,     /api/articles,        Create a new article
GET,       /api/articles/:id,    Get full details of one article
PUT,      /api/articles/:id,     Update an existing article
DELETE,    /api/articles/:id,     Delete an article
GET,       /api/articles/stats,    The Dashboard Stats (Aggregated Data)


Categories
Method	  Endpoint	          What it does
GET	      /api/categories	  List all available categories
POST	 /api/categories	  Add a new category




Quick Testing Guide (Postman)
Step 1: Create a Category first (e.g., "Technology").
Step 2: Copy the _id from the response.
Step 3: Use that ID while creating an Article.
Step 4: Hit the /stats endpoint to see the magic happen!


Developer Notes
I used Mongoose Population to make sure when you fetch an article, you get the category name and slug, not just a random ID.

The Filtering is slug-based because it's better for SEO and much more human-readable.

I've added Global Error Handling to ensure the server doesn't crash even if there's a bad request.























<!-- # Article Management System (REST API)

A production-ready backend built with Node.js, Express, and MongoDB.

##  Quick Start
1. **Clone the project**
2. **Install Dependencies:** `npm install`
3. **Setup Environment:** Create a `.env` file in the root and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development


 Run Server: npm start
 🛠 Features

CRUD Operations: Articles and Categories management.
Dynamic Filtering: Filter articles by category slug.
Dashboard Stats: Aggregated data for the admin dashboard.
Security: Helmet and CORS integrated.

API Endpoints
Method,  Endpoint,           Description
GET:    /api/articles,        Fetch all articles
GET:    /api/articles/stats,  Dashboard statistics
POST:   /api/categories,     Create a new category
PUT:    /api/articles/:id,    Update an article -->