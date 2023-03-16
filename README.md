## Backend Task
This project is a simple REST application created using the NestJS framework. It communicates with https://reqres.in/ to retrieve user data and implements CRUD operations for user avatars stored in the local file system and MongoDB database.

## Prerequisites
To run this application, you need to have the following installed:
- Node.js (v14 or above)
- MongoDB (v4.4 or above)
- RabbitMQ (v3.7 or above)

## Installation
- Clone the repository
- Install dependencies using `npm install`

## Configuration
- Define the MongoDB connection string into `app.config` file.

## Usage
- Start the application using npm run start. The application will start on the specified port (default is 3000).

## POST /api/user
Creates a new user entry in the MongoDB database.

## GET /api/user/{userId}
Retrieves user data from https://reqres.in/api/users/{userId} and returns it in JSON representation.

## GET /api/user/{userId}/avatar
Retrieves the user's avatar from the local file system. On the first request, it saves the image as a plain file in the avatars directory and stores an entry in the MongoDB database with the user ID and hash. On subsequent requests, it retrieves the file from the avatars directory and returns it in base64-encoded representation.

## DELETE /api/user/{userId}/avatar
Removes the user's avatar from the local file system and the corresponding entry from the MongoDB database.

## Conclusion
This project demonstrates the usage of NestJS framework, MongoDB, RabbitMQ, and basic CRUD operations. It can be extended with additional features and improvements based on specific requirements.