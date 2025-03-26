# GB Challenge Backend

This repository contains the backend implementation for the GB Challenge project. It provides the necessary APIs and services to support the application's functionality.

## Features

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Role-Based Access Control**: Different levels of access based on user roles.
- **Email Verification**: Email-based account verification and password recovery.
- **Scalable Architecture**: Built with scalability and maintainability in mind.
- **RESTful API**: Provides a set of RESTful endpoints for seamless integration with the frontend.
- **Database Integration**: Uses PostgreSQL as the primary database for storing application data.
- **Environment Configuration**: Fully configurable using environment variables for different environments.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **PostgreSQL**: Relational database for data storage.
- **Sequelize**: ORM for database management.
- **JWT**: For secure authentication.
- **Nodemailer**: For sending emails.
- **Resend API**: For email delivery services.
- **dotenv**: For managing environment variables.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/GB_challenge_backend.git
    cd GB_challenge_backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables as described in the [Environment Variables](#environment-variables) section.

4. Run database migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the application:
    ```bash
    npm start
    ```

## Environment Variables

This project uses environment variables to configure its behavior. Below is a list of the required environment variables and their usage:

- `DB_HOST`: Specifies the hostname or IP address of the database server. Example: `localhost` or `127.0.0.1`.
- `DB_PORT`: Specifies the port number on which the database server is running. Default: `5432`.
- `DB_USER`: The username for authenticating with the database.
- `DB_PASSWORD`: The password for the specified database user.
- `DB_NAME`: The name of the database to connect to.
- `JWT_SECRET`: A secret key used for signing and verifying JSON Web Tokens (JWT) for authentication.
- `API_KEY`: An optional API key for accessing third-party services.
- `NODE_ENV`: Specifies the environment in which the application is running. Possible values: `development`, `production`.
- `PORT`: Specifies the port number on which the application will run. Default: `3002`.
- `SECRET_JWT_SEED`: A secret seed used for generating secure JWT tokens.
- `JWT_EXPIRE_IN`: Defines the expiration time for JWT tokens. Example: `3h` for 3 hours.
- `SENDMAIL_TIME_LIMIT`: Specifies the time limit (in minutes) for sending emails. Example: `10`.
- `RESEND_API_KEY`: An API key used for the Resend email service.
- `CODE_EXPIRE_IN`: Defines the expiration time (in seconds) for verification codes. Example: `600` for 10 minutes.
- `FRONTEND_DOMAIN`: Specifies the domain of the frontend application. Example: `http://localhost:5173`.

### Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add the required variables in the following format:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=gb_challenge
    JWT_SECRET=your_secret_key
    API_KEY=your_api_key
    NODE_ENV=development
    PORT=3002
    SECRET_JWT_SEED=your_secret _seed
    JWT_EXPIRE_IN=3h
    SENDMAIL_TIME_LIMIT=10
    RESEND_API_KEY=your_resend_api_key
    CODE_EXPIRE_IN=600
    FRONTEND_DOMAIN=http://localhost:5173
    ```

Ensure that all required variables are set before starting the application to avoid runtime errors.

## Contact

For any questions or feedback, please contact:

- **Name**: Daniel Rojas
- **Email**: dev.luis.rojas@gmail.com

