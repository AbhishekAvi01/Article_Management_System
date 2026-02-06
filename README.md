 Project Overview
----------------------
 Article Management System ( Backend)
A production-ready REST API built with Node.js, Express, and MongoDB. This engine now supports Cloud-based Image Uploads for both Articles and Categories.
 
--------------------------------------------
 Features
 ---------
 1) Article & Media Management: Full CRUD operations for articles, now with Cloudinary-powered image uploads.

2) Smart & Visual Categories: Articles are linked to categories, and categories now support representative icons/images.

3) Dynamic Slug Filtering: Filter articles instantly by passing a category slug in the URL (SEO-friendly).

4) Pro Admin Stats: A specialized dashboard endpoint using MongoDB Aggregation to calculate totals, status counts, and category breakdowns.

5) Clean & Scalable Architecture: Strictly follows the MVC (Model-View-Controller) pattern for maintainable and bug-free code.

6) Automated Cleanup: System automatically deletes old images from the cloud when an article/category is removed or updated.

7) Security Suite: Integrated Helmet for secure headers and CORS for safe cross-origin requests.

-----------------------------------------------------
Environment Setup
----------------
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
----------------------------------------------


Installation & Start
------------------
npm install
npm start
----------------


API Reference
--------------
Method	     Endpoint	Body        Type	       Description
GET	         /api/articles	      N/A	         Fetch all (Use ?category=slug to filter)
POST	       /api/articles	      form-data	    Create article with image 
PUT	         /api/articles/:id	  form-data	   Update article & replace image
DELETE	     /api/articles/:id	  N/A	         Delete article (Auto-removes image)
GET	        /api/articles/stats	  N/A	          Dashboard Statistics Dashboard 
--------------------------


Categories
----------
Method    Endpoint,           Body Type,     Description
POST     /api/categories,      form-data,     Create a new category with an icon/image 
GET       /api/categories,     N/A,           List all available categories
GET      /api/categories/:id,  N/A,           Get details of a specific category
PUT      /api/categories/:id,  form-data,     Update category details or replace the icon 
DELETE   /api/categories/:id,  N/A,           Remove a category (Auto-deletes image from
                                              Cloudinary) 
 -------------------------------------------------------------


 Postman Testing Guide (CRUCIAL)
 ------------------------
 Since we are now handling file uploads, RAW JSON will not work for create/update.

   1) Set method to POST or PUT.
   2) Go to the Body tab and select form-data.
   3) Add the following keys:
      image: Set type to File and upload your image.
      title, slug, content, status, category: Set type to Text.
   4) Hit Send and check the success: true response!
--------------------------------------------

Developer Notes
-------------
1) Reusability: I used a centralized cloudinary.js config to handle uploads for both Models.
2) SEO & UX: Slugs are indexed for fast searching and better SEO performance.
3) Error Handling: Centralized error layer catches duplicate slugs and missing files.


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 <!-- Project Overview
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




Quick Testing Guide (Postman)
To see the system in action, follow these simple steps:

Create a Category: First, hit POST /api/categories to create a category (e.g., "Technology").

Copy the ID: From the response, copy the _id of the new category.

Create an Article: Use that ID in the category field when you POST /api/articles.

Check Stats: Hit GET /api/articles/stats to see how the system automatically updates the dashboard data!

 Developer Notes
Mongoose Population: I used .populate() to ensure that when you fetch an article, you get the full category name and slug instead of just a random ID.

Slug-based Filtering: Filtering is implemented via slugs (e.g., ?category=tech) because it's better for SEO and much more human-readable.

Global Error Handling: I've added a centralized error layer to handle unhandled rejections, ensuring the server stays live even with bad input.


















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
PUT:    /api/articles/:id,    Update an article --> -->