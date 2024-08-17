## Job Junction - A Job Search & Networking Platform

This repository houses the frontend and backend code for Job Junction, a web application designed to help users find jobs and connect with professionals.

### Project Structure

The project is organized into two main directories:

* **backend:** Contains the server-side code written in Node.js.
* **frontend:** Contains the client-side code built with React and Tailwind CSS.

### Frontend (frontend directory)

* **.env:**  Environment variables for development and production configurations.
* **eslint.config.js:** ESLint configuration file for code linting.
* **index.html:** The main HTML file for the application.
* **package-lock.json:** Lock file for package dependencies.
* **package.json:** Defines project dependencies, scripts, and other metadata.
* **postcss.config.js:** Configuration file for PostCSS, used for styling.
* **public:**
    * **vite.svg:** A default SVG icon for the application.
* **README.md:** This README file.
* **src:**
    * **App.css:**  Global styles for the application.
    * **App.jsx:** The main React component for the application.
    * **assets:**
        * **react.svg:** An SVG icon for React.
    * **index.css:**  Global styles for the application.
    * **main.jsx:** Entry point for the application.
    * **privatePages:**
        * **profile:**
            * **Profile.jsx:** The component for user profile pages.
    * **publicPages:**
        * **authPages:**
            * **Login.jsx:** The component for user login.
            * **ProtectedRoute.jsx:**  A component for implementing protected routes.
            * **Signup.jsx:** The component for user signup.
        * **landingPage:**
            * **LandingPage.jsx:** The main landing page of the application.
* **tailwind.config.js:** Configuration file for Tailwind CSS.
* **vite.config.js:** Configuration file for Vite, the build tool.

### Backend (backend directory)

* **index.js:** The entry point for the server.
* **package-lock.json:** Lock file for package dependencies.
* **package.json:** Defines project dependencies, scripts, and other metadata.

### Technologies Used

* **Frontend:**
    * React
    * Vite
    * Tailwind CSS
    * ESLint
* **Backend:**
    * Node.js
    * Express
    * MongoDB

### Getting Started

1. **Clone the repository:** `git clone https://github.com/your-username/job-junction.git`
2. **Navigate to the backend directory:** `cd job-junction/backend`
3. **Install dependencies:** `npm install`
4. **Start the backend server:** `npm start`
5. **Navigate to the frontend directory:** `cd ../frontend`
6. **Install dependencies:** `npm install`
7. **Start the frontend development server:** `npm run dev`

The frontend will be available at `http://localhost:5173/`.

### Features

* User authentication (login, signup)
* Job search by keywords, location, and filters
* User profiles with saved jobs and applications
* Networking features for connecting with professionals

### Future Plans

* Implement more advanced search filters.
* Add job recommendations based on user preferences.
* Enhance networking features with messaging and group functionality.

This is a starting point for building Job Junction. Feel free to contribute to this project by adding new features, fixing bugs, or improving the user experience. 
