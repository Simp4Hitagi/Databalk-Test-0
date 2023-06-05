GetAHouse API Documentation
This repository contains the documentation for the GetAHouse API. Below you will find information about the available routes and their descriptions.

Home Route
Route: GET /
Description: Home Page

User Routes
Route: POST /register
Description: Register a new user.

Route: POST /login
Description: Login a user that's already registered.

Route: GET /users
Description: Get all the users that are registered.

Route: GET /user/userID
Description: Get a user by using the unique userID.

Route: DELETE /user/:userID
Description: Delete a user by using its unique userID.

Route: PUT /user/:userID
Description: Update an existing user profile by using the userID.

House Routes
Route: GET /houses
Description: Get all the houses.

Route: GET /house/:houseID
Description: Get a single house by using the unique houseID.

Route: POST /house
Description: Add a house to the API.

Route: PUT /house/:houseID
Description: Update a house by making use of the unique houseID.

Route: DELETE /house/:houseID
Description: Delete a single house by using the houseID.

Technologies Used

Node.js 

bcrypt: ^5.1.0
body-parser: ^1.20.2
cookie-parser: ^1.4.6
cors: ^2.8.5
dotenv: ^16.1.4
express: ^4.18.2
jsonwebtoken: ^9.0.0
mysql: ^2.18.1
nodemon: ^2.0.22

JavaScript
HTML
Bootstrap 5.3.0-alpha1