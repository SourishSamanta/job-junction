## Job Junction - A Full-Stack Job Board Application

This repository contains the code for Job Junction, a full-stack web application that connects job seekers with employers. The application is built using a combination of Node.js, Express.js, MongoDB, React.js, and Tailwind CSS.

### Project Structure

The project is structured into two main directories:

- **backend**: Contains the server-side logic written in Node.js using Express.js for routing and MongoDB for data persistence.
- **frontend**: Contains the client-side logic written in React.js, styled with Tailwind CSS, and built using Vite.js.

### Frontend Features

The frontend of Job Junction provides the following features:

- **Landing Page**: Displays information about the platform and its features, and allows users to sign up or login.
- **Login & Signup**: Securely authenticates users and stores their information in the database.
- **Profile Management**: Allows users to view and edit their profiles, including their skills, experience, and preferences.
- **Job Listing**: Displays a list of available jobs, with filtering and sorting options based on location, skills, and job type.
- **Job Detail Page**: Provides detailed information about each job, including the description, requirements, and application process.
- **Protected Routes**: Ensures only logged-in users can access certain features like profile management and job applications.

### Backend Features

The backend of Job Junction is responsible for:

- **API Endpoints**: Provides RESTful APIs for the frontend to interact with the database.
- **User Authentication**: Handles user registration, login, and session management.
- **Data Storage**: Stores user data, job listings, and other relevant information in MongoDB.
- **Data Validation**: Ensures data integrity and consistency through input validation.

### Running the Application

To run the application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/job-junction.git
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd job-junction/backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the backend server**:
   ```bash
   npm start
   ```

5. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

6. **Install dependencies**:
   ```bash
   npm install
   ```

7. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:5173`.

### Contributing

Contributions are welcome! Please feel free to submit pull requests or report issues on the repository's issue tracker.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
