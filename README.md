# Social Media

**Social Media** is a project developed using Node.js, React, TypeScript, Redux, Socket.io, and Tailwind CSS. This project combines features like user authentication, friends, creating posts with likes and comments, and also provides real-time messaging using Socket.io.

## Table of Contents
- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Description
This project is a full-fledged social network with user registration and authentication. Users can create profiles, add friends, post, like posts, and comment on other users' posts. The highlight of the project is real-time messaging between users using Socket.io.

## Technologies
The project utilizes the following technologies and tools:
- **Node.js:** The server-side of the application is built with Node.js.
- **React:** The frontend of the application is created using React.
- **TypeScript:** The client is fully typed using TypeScript.
- **Redux:** Redux is used for state management.
- **Socket.io:** Real-time messaging between users.
- **Tailwind CSS:** Styling the user interface.
- **MongoDB:** MongoDB is used as the database to store application data.

## Installation
To install and run the project locally, follow these steps:

1. **Clone the repository:** Clone this repository to your computer.
   ```bash
   git clone https://github.com/your-username/social_media.git

2. **Navigate to the project directory:**
   ```bash
   cd social_media

3. **Install server-side dependencies:**
   ```bash
   cd server
   npm install

4. **Install client-side dependencies:**
   ```bash
   cd client
   npm install

5. **Set up environment variables:** You need to create two separate .env files for the client and the server in the project root directory. Below are the necessary environment variables for each: 
   #### Client (.env in the client directory) 
      ```bash
      REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
      REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
      REACT_APP_ENDPOINT=your_endpoint
      ```
   Make sure to add the `.env` file to the `.gitignore` list to avoid exposing your secret keys.
   #### Server (.env in the client directory) 
      ```bash
      MONGO_URL=your_mongo_url
      PORT=your_port
      FRONTEND=your_frontend_url
      JWT_SECRET=your_jwt_secret


6. **Start the server:**
   ```bash
    cd server
    npm start
   
7. **Start the client:**
   ```bash
    cd client
    npm start

After completing these steps, your application will be accessible at http://localhost:3000/.

## Usage

After installing and running the project, you can create an account, log in, and start using the social network. You can add friends, create posts, like posts, comment on posts, and communicate in real-time with other users.

**You can check out the deployed version of this project [here](https://social-media-sergey325.vercel.app/).**
