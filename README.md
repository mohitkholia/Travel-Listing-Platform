# TripNest - Travel Listing Platform

A full-stack travel listing web application built with Node.js, Express, MongoDB, and EJS. Users can browse travel destinations, create listings, leave reviews, and manage their own property posts with secure authentication.

This project is designed like a simplified Airbnb-style platform where travel lovers can list homes, cabins, villas, and unique stays with images, pricing, locations, and user reviews.

---

## Live Demo

**Live Website:**  
https://travel-listing-platform-production.up.railway.app/listings


---

## Features

- User signup and login with Passport.js
- Secure session management using Express Session and MongoDB store
- Travel listing creation, editing, and deletion
- Listing search by title
- Location-based geocoding using Mapbox
- Image uploads with Cloudinary
- Review creation and deletion
- Flash notifications for success/error messages
- Responsive EJS templates with custom layout styling
- Owner-based authorization for listings
- Author-based authorization for reviews
- Joi validation for listings and reviews
- Custom error handling
- MongoDB Atlas database
- Railway deployment

---

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: EJS, HTML, CSS, JavaScript
- Database: MongoDB with Mongoose
- Authentication: Passport.js + passport-local-mongoose
- Validation: Joi
- Image Hosting: Cloudinary
- Geocoding: Mapbox SDK
- Session Storage: connect-mongo
- Styling: Custom CSS
- Deployment: Railway
- Version Control: Git & GitHub

---

## Project Architecture

The application follows the MVC (Model-View-Controller) architecture.

```text
User
  |
  v
Routes
  |
  v
Middleware
  |
  v
Controllers
  |
  v
Models
  |
  v
MongoDB
  |
  v
EJS Views
  |
  v
User
```

### MVC Structure

- **Models** handle database schemas and MongoDB operations.
- **Views** contain the EJS templates shown to users.
- **Controllers** contain the main application logic.
- **Routes** define application endpoints.
- **Middleware** handles authentication, authorization, validation, and other request processing.

---

## Project Structure

```text
Travel-Listing-Platform/
├── app.js
├── cloudConfig.js
├── middleware.js
├── package.json
├── package-lock.json
├── schema.js
├── .gitignore
├── README.md
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
└── views/
    ├── error.ejs
    ├── includes/
    │   ├── flash.ejs
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listings/
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── users/
        ├── login.ejs
        └── signup.ejs
```

---

## Core Functionality

### Listings

The platform supports:

- Viewing all listings
- Searching by listing title
- Creating a new travel listing
- Editing an existing listing
- Deleting a listing
- Showing detailed listing information
- Uploading listing images
- Displaying listing owners
- Displaying reviews

Each listing stores:

- title
- description
- location
- country
- price
- image URL and filename
- owner reference
- reviews
- geolocation coordinates

### Reviews

Users can:

- Add reviews with a rating from 1 to 5
- Leave comments on a listing
- View reviews
- Delete their own reviews

Review authors are associated with users through MongoDB references.

### Authentication

The application uses:

- Passport Local Strategy
- Passport Local Mongoose
- Username/password registration
- Session-based login
- Session persistence using MongoDB
- Redirect logic after login
- Logout functionality
- Flash messages for user feedback

### Authentication Flow

```text
Signup
   |
   v
User.register()
   |
   v
Passport Local Mongoose
   |
   v
MongoDB
   |
   v
Login Session
```

### Login Flow

```text
Login Form
    |
    v
passport.authenticate("local")
    |
    v
Username + Password Verification
    |
    v
Session Created
    |
    v
Authenticated User
```

---

## Authorization

TripNest implements authorization to control who can modify content.

### Listing Authorization

Only the owner of a listing can:

- Edit the listing
- Delete the listing

```text
User
 |
 v
isLoggedIn
 |
 v
isOwner
 |
 v
Edit / Delete Listing
```

### Review Authorization

Only the author of a review can delete that review.

```text
User
 |
 v
isLoggedIn
 |
 v
isReviewAuthor
 |
 v
Delete Review
```

---

## Search

Users can search for destinations using the navigation search bar.

The search request uses:

```text
GET /listings?search=<query>
```

The application performs a case-insensitive search against listing titles.

Example:

```text
/listings?search=goa
```

---

## Image Uploads

Listing images are uploaded using Multer and stored on Cloudinary.

```text
Listing Form
     |
     v
   Multer
     |
     v
 Cloudinary
     |
     v
Image URL + Filename
     |
     v
   MongoDB
```

The listing stores image information such as:

```js
image: {
    url: String,
    filename: String
}
```

Cloudinary is used instead of storing image files directly on the application server.

---

## Mapbox Integration

Mapbox is used for location-based geocoding.

When a user enters a listing location, Mapbox geocoding is used to generate geographic coordinates.

```text
User Entered Location
        |
        v
Mapbox Geocoding
        |
        v
Latitude + Longitude
        |
        v
Listing Geometry
        |
        v
Map
```

---

## Core Routes

### Listings

```text
GET     /listings
GET     /listings/new
POST    /listings
GET     /listings/:id
GET     /listings/:id/edit
PUT     /listings/:id
DELETE  /listings/:id
```

### Reviews

```text
POST    /listings/:id/reviews
DELETE  /listings/:id/reviews/:reviewId
```

### Users

```text
GET     /signup
POST    /signup
GET     /login
POST    /login
GET     /logout
```

---

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
MONGO_URL=your_mongodb_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_access_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

For local development, the application uses port `3000` by default:

```text
http://localhost:3000
```

In production, Railway provides the `PORT` environment variable automatically.

> Never commit your `.env` file or expose MongoDB credentials, session secrets, or Cloudinary API secrets.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mohitkholia/Travel-Listing-Platform.git
cd Travel-Listing-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root and configure MongoDB, session secret, Cloudinary, and Mapbox.

### 4. Start the application

```bash
npm start
```

The application uses:

```json
"scripts": {
    "start": "node app.js"
}
```

### 5. Open the application

```text
http://localhost:3000
```

---

## App Behavior

The application starts in `app.js` and sets up:

- Express application
- EJS templating
- EJS-Mate layouts
- Static asset serving
- MongoDB connection
- Express sessions
- MongoDB session storage
- Flash messages
- Passport authentication
- Local authentication strategy
- Listing routes
- Review routes
- User routes
- Error handling

---

## Validation and Error Handling

The project uses Joi schemas to validate data before creating or updating listings and reviews.

### Listing Validation

Examples include:

- Title is required
- Description is required
- Location is required
- Country is required
- Price is required

### Review Validation

Examples include:

- Rating must be between 1 and 5
- Comment must be provided

Invalid data is passed to the application's error-handling system.

The project also includes:

```text
utils/ExpressError.js
```

for custom application errors.

Asynchronous route errors are handled using:

```text
utils/wrapAsync.js
```

Unknown routes are handled with a 404 response and rendered through the error page.

---

## Database Models

### User

- username
- email
- authentication data managed by passport-local-mongoose

### Listing

- title
- description
- image
- price
- location
- country
- owner
- reviews
- geometry

### Review

- comment
- rating
- createdAt
- author

---

## Database

### Local Development

The application can use a local MongoDB database:

```text
mongodb://127.0.0.1:27017/tripNest
```

### Production

The deployed application uses MongoDB Atlas.

Database name:

```text
tripNest
```

---

## Session Management

TripNest uses Express Session with MongoDB storage through `connect-mongo`.

```text
Browser
   |
   v
Session Cookie
   |
   v
Express Session
   |
   v
MongoStore
   |
   v
MongoDB Atlas
```

This allows authenticated sessions to be stored in MongoDB rather than relying on the server's in-memory session store.

---

## Deployment

TripNest is deployed using **Railway**.

### Production Architecture

```text
                    ┌──────────────────────┐
                    │       Railway        │
                    │  Node.js + Express   │
                    └──────────┬───────────┘
                               |
              ┌────────────────┼────────────────┐
              |                |                |
              v                v                v
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │  MongoDB    │  │  Cloudinary │  │   Mapbox    │
       │    Atlas    │  │   Images    │  │  Geocoding  │
       └─────────────┘  └─────────────┘  └─────────────┘
```

### Application Hosting

```text
Railway
```

### Database

```text
MongoDB Atlas
```

### Image Storage

```text
Cloudinary
```

### Mapping & Geocoding

```text
Mapbox
```

---

## GitHub

Repository:

https://github.com/mohitkholia/Travel-Listing-Platform

The project uses Git for version control and GitHub for repository hosting.

Basic workflow:

```bash
git add .
git commit -m "your commit message"
git push
```

---

## App Flow

```text
User
 |
 v
Visit TripNest
 |
 v
Browse Listings
 |
 v
Search Destination
 |
 v
Open Listing
 |
 +--------------------+
 |                    |
 v                    v
Login / Signup     View Details
 |                    |
 v                    v
Create Listing      Add Review
 |
 v
Upload Image
 |
 v
Cloudinary
 |
 v
MongoDB
 |
 v
Manage Own Listing
 |
 v
Logout
```

---

## Notes

- The project name is **TripNest** and the database used in production is `tripNest`.
- Listing images are stored using Cloudinary with `multer-storage-cloudinary`.
- Mapbox geocoding is used to generate coordinates from user-entered locations.
- Authentication is handled using Passport.js and passport-local-mongoose.
- Sessions are stored in MongoDB using connect-mongo.
- The application follows an MVC structure with separate controllers, models, routes, views, and middleware.
- The application is deployed on Railway with MongoDB Atlas as the production database.

---

## Future Ideas

- Add user profile pages
- Add favorite/wishlist functionality
- Improve search filters by country and price
- Add sorting functionality
- Add admin dashboard
- Add booking/reservation features
- Add image deletion from Cloudinary
- Improve mobile responsiveness
- Add automated testing
- Add more Mapbox functionality
- Add pagination for listings
- Add advanced destination filtering

---

## What I Learned

Building TripNest helped me understand and implement:

- Node.js
- Express.js
- MVC architecture
- RESTful routing
- MongoDB
- Mongoose
- CRUD operations
- EJS templating
- EJS-Mate
- Passport.js
- Local authentication
- Session management
- MongoDB session storage
- Authorization middleware
- Joi validation
- Error handling
- Multer
- Cloudinary
- Mapbox
- Method override
- Flash messages
- Git
- GitHub
- MongoDB Atlas
- Railway deployment
- Environment variables

---

## License

This project uses the **ISC License** as specified in `package.json`.

---

## Author

**Mohit Kholia**

MCA Student | Full-Stack Web Development

GitHub:

https://github.com/mohitkholia/Travel-Listing-Platform

---

## Summary

TripNest is a full-stack travel listing application that combines authentication, authorization, database management, image uploads, geolocation, search, and review functionality into a single Express.js application.

The project follows a clean MVC architecture with separate controllers, routes, models, views, and middleware, making the application easier to understand, maintain, and extend.
