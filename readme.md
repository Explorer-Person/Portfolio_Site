
---

# Personal Customizable Portfolio Site

## Overview
A complete portfolio site utilizing React for the front-end and Node.js for the back-end, with Axios handling server connections and Redux managing state.

---

## **Table of Contents**
- **[Front-End Features](#front-end-features)**
- **[Back-End Features](#back-end-features)**
- **[Project Architecture](#project-architecture)**
- **[Testing](#testing)**

---

## **Front-End Features**

### **Core Technologies**
- **[React](https://reactjs.org/)** for component-based UI.
- **[Axios](https://axios-http.com/)** for server connections.
- **[Redux](https://redux.js.org/)** for managing front-end state.
- **[Vite](https://vitejs.dev/)** for blazing-fast front-end development.
- **TypeScript** for type safety and code reliability.
- **Responsive data formats:** Supports FormData and JSON for API requests.

### **Key Packages**
- **Redux:** For global state management.
- **Axios:** For sending HTTP requests to the server.
- **Bootstrap/React-Bootstrap:** For responsive styling.
- **React-Router-Dom:** For managing routes.
- **@Reduxjs/Toolkit:** To streamline Redux setup.
- **React-Redux:** For connecting React components with Redux.

---

## **Back-End Features**

### **Core Technologies**
- **Node.js** with Express framework for handling server-side logic.
- **MySQL** for database management.
- **Sessions:** Managed via `express-session` and stored in MySQL.

### **Key Packages**
- **Express:** For routing and back-end logic.
- **Express-Session:** For creating automatic sessions upon successful authentication.
- **Express-MySQL-Session:** Stores session data in MySQL.
- **Express-Validator:** For sanitizing and validating user inputs.
- **ffmpeg:** For processing video files.
- **Jimp:** For image manipulation and resizing.
- **CORS:** For managing API access restrictions.
- **Helmet:** For securing HTTP headers.
- **Morgan:** For logging requests.
- **Multer:** For handling multipart/form-data (file uploads).
- **UUID:** For generating unique IDs.
- **bcrypt.js:** For encrypting passwords before saving to the database.

### **API Structure**

#### Controllers
- Controllers manage logic for CRUD operations for various entities like:
  - **Admin:** `/controller/admin`
  - **Skills:** `/controller/skills`
  - **Projects:** `/controller/projects`
  - **Project Images:** `/controller/projectImages`
  - **Abilities:** `/controller/abilities`

```javascript
exports.getAbility = async (req, res) => {
    try {
        const id = req.params.id;
        const abilities = new abilitiesQuery();
        const response = await abilities.getOne(id);

        const formattedData = dataFormatter(response.data);
        sendResponse(res, formattedData, response.process, response.status, response.statusCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
```

#### Routes
- **Authorized Routes:** Accessible after authentication.
- **Unauthorized Routes:** Handle login, signup, and public data retrieval.
  
```javascript
routes.use('/authorized/', auth.check, authorized);
routes.use('/', unauthorized);
```

#### Database Utilities
- **`/db` directory:** Contains core MySQL operations such as:
  - Database creation.
  - Query execution via `executeQuery(query, parameters)` function.

#### Middleware
- **Authorization, CORS, Helmet, Resizer, Multer:** Each has its own logic for security and data management.

```javascript
// Example for resizer middleware
const resizeImage = (req, res, next) => {
    if (req.file.mimetype.startsWith('image/')) {
        // Resize using Jimp
    } else if (req.file.mimetype.startsWith('video/')) {
        // Resize using ffmpeg
    }
    next();
};
```

---

## **Project Architecture**

### **Front-End**

#### **Folder Structure**

- **`/assets/images`:**  
  Stores static image files used throughout the site, such as logos, icons, or any visual assets necessary for the UI. These are referenced by various components or layouts to maintain a consistent design across the app.

- **`/components`:**  
  Contains reusable components that can be shared across multiple pages and sections of the application. Examples include:  
  - **`AlertBox`:** A UI component for displaying alerts or notifications, typically used for showing success, error, or warning messages.
  - **`ConfBox`:** A confirmation dialog box component, used for prompting users before executing critical actions like delete or update.
  - **`CustomButton`:** A reusable button component with customizable styles and behaviors that can be used in different forms or interactive areas.
   ...
    
- **`/layouts`:**  
  Contains the layout components that structure the overall user interface of the app. This usually includes components that remain consistent across different pages, such as:  
  - **`Navbar`:** The navigation bar component, which contains links or menus to help users navigate between different sections of the app.
  - **`Footer`:** The footer component, displayed at the bottom of the page, typically containing copyright information, links, or other persistent elements.

- **`/pages`:**  
  Houses all the page components that represent different views or sections of the app. Each page corresponds to a route, for instance:  
  - **`Authentication`:** Handles user login, registration, and password recovery.
  - **`Home`:** The landing page when the user visits the app.
  - **`Project`:** Displays project-related content or actions, possibly with detailed subpages for individual projects.

- **`/shared`:**  
  This directory contains shared utilities and hooks that are used across multiple parts of the app. It has two key hooks:  
  - **`/formHook`:** Contains all request processes, handling operations such as `POST`, `PUT`, and `DELETE`. This hook centralizes the logic for form submissions, ensuring consistency across different forms.
  - **`/inputGenerator`:** Dynamically generates input fields based on an incoming JSON structure (such as for `admin`, `skills`, etc.). This hook simplifies form creation by automating the input rendering process according to the required data.

- **`/store`:**  
  Contains the core logic for Redux state management, with two main parts:  
  - **`/store.ts`:** The central store configuration file, where all slices and middleware are combined to create the Redux store. It provides the global state of the app.
  - **`/hook.ts`:** Provides hooks such as `useDispatch` and `useSelector` to make Redux functionalities easier to use with React components.

  Additionally, it contains two subdirectories:
  - **`/apis`:** Contains all API request functions, typically created using Axios. These functions handle network requests (e.g., fetching, creating, updating, deleting resources) and are used in conjunction with Redux slices.
  - **`/slices`:** Contains Redux slices, which define the state, actions, and reducers for managing different parts of the app's data. Each slice corresponds to a specific feature or entity, such as `adminSlice` or `skillsSlice`, and is responsible for handling incoming API response data and triggering DOM updates accordingly.

#### **Key Front-End Components**
- **AlertBox:** Displays server-side errors or validation issues.
- **ConfBox:** Toggler box with dynamic input fields based on JSON structures.
- **CustomButton:** Reusable button component that triggers API calls or actions.

```javascript
<CustomButton style={styleDeleteButton} id={id} process='deleteOne' type='request' inheritor={inheritor}/>
```

### **Back-End**

#### **Folder Structure**

- **`/controller`:**  
  Manages API logic for various entities. Each controller corresponds to a specific entity (such as user, admin, etc.) and defines the business logic for handling requests, interacting with the models, and sending responses.

- **`/routes`:**  
  Organizes the API endpoints. This is split into routes for authorized and unauthorized users, ensuring different access control based on user roles or authentication status. Each entity has its own route file that connects to the respective controller.

- **`/db`:**  
  Handles MySQL database operations such as establishing connections, managing transactions, and executing raw SQL queries if needed. Also manages configurations for different environments like development, testing, and production.

- **`/middlewares`:**  
  Contains middleware functions for various purposes such as authentication (JWT-based), authorization (role-based access control), file handling (multipart/form-data), rate limiting, and security enhancements (helmet, cors). 

- **`/validators`:**  
  Validates incoming data using Express-Validator. Each validator file corresponds to an entity or request type, ensuring proper data formats and constraints (e.g., for user registration, login, and other API actions).

- **`/queries`:**  
  Executes MySQL queries, with each file containing query functions for a specific entity (such as `adminQueries`, `skillsQueries`, etc.). These queries interact directly with the models and are used within controllers or services.

- **`/models`:**  
  Defines the structure of the database tables (e.g., `admin`, `skills`, `users`, etc.). Each model maps to a table in the MySQL database, managing the schema and relationships between different entities.

- **`/handlers`:**  
  Contains response handlers.  
  - **`/responseHandler`:** Used by the controller layer to handle API responses, providing a standardized format for success and error messages.  
  - **`/dbResponseHandler1`:** Handles responses from the database layer (within `/queries`), ensuring consistent formatting and proper error handling when interacting with the MySQL database.

- **`/utils`:**  
  Utility functions used across the application for tasks like logging, formatting, environment variable management, and general-purpose helper functions. This folder often contains folders like `/dataFormatter`, `/htmlSanitizer`, or `/queryExecuter`.

- **`/test`:**  
  Contains only mw test for seeing mw outputs.(for now)


#### Example of a Query
```javascript
getOne = async (id) => {
    const query = "SELECT * FROM abilities WHERE id=?";
    const param = [id];
    return dbResponseHandler(null, 200, "getOne", query, param, abilitiesModel());
};
```

#### **Database Models**
- Each model represents a MySQL table, e.g., **Admin, Skills, Projects.**
  
```sql
CREATE TABLE IF NOT EXISTS Abilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    fk INT,
    FOREIGN KEY (fk) REFERENCES admin(id)
);
```

---

## **Testing**

- **Middleware Tests:** `/tests` directory contains unit tests for middleware functions, ensuring error-free logic and handling.


---
Here's a refined version of the instructions with the required tools like Node.js, Vite (for React), MySQL, and MySQL Client added:

---

### **Setting Up Development Environment**

---

#### **Requirements**
- **Node.js** (Ensure you have Node.js installed: [Download Node.js](https://nodejs.org/))
- **Vite** (for React development)
- **MySQL** (Ensure you have MySQL installed: [Download MySQL](https://dev.mysql.com/downloads/))
- **MySQL Client** (Install the MySQL client tools for database interaction)

---

#### **Backend Setup**

*Requirements: Git CLI, Node.js, MySQL, MySQL Client*

1. **Clone the Repository**  
   Open your terminal (Command Prompt) and run the following command to clone the project repository:
   ```bash
   git clone https://github.com/Explorer-Person/Portfolio_Site.git
   ```

2. **Navigate to the Backend Directory**  
   Move into the project directory and access the backend folder:
   ```bash
   cd interested_directory/Portfolio_Site/Portfolio-Backend
   ```

3. **Install Backend Dependencies**  
   Install all necessary backend dependencies by running:
   ```bash
   npm i
   ```

4. **Install Nodemon**  
   Nodemon is a tool for automatic server restarts during development:
   ```bash
   npm i nodemon -g --save
   ```

5. **Fix Vulnerabilities (Optional)**  
   If there are any security vulnerabilities, you can fix them using:
   ```bash
   npm audit fix
   npm audit fix --force   # Only use if the first command doesn't work (not recommended for production)
   ```

6. **Configure Environment Variables**  
   Create a `.env` file in the backend directory and add your environment-specific variables (e.g., database credentials and server port):
   ```
   DB_HOST=your_value
   DB_USER=your_value
   DB_PASSWORD=your_value
   DB_NAME=your_value
   PORT=your_value
   #...You can add according your specific
   ```

7. **Start the Development Server**  
   After configuring the environment, start the server by running:
   ```bash
   nodemon server.js
   ```

---

#### **Client Side Setup**

1. **Navigate to the Frontend Directory**  
   Change to the frontend directory:
   ```bash
   cd ../Portfolio
   ```

2. **Install Frontend Dependencies**  
   Install the required dependencies for the React client using Vite:
   ```bash
   npm i
   ```

3. **Fix Vulnerabilities (Optional)**  
   Similar to the backend, if there are any vulnerabilities, you can fix them by running:
   ```bash
   npm audit fix
   ```

4. **Configure VITE Environment Variables**  
   Create a `.env` file in the frontend directory and add your backend server URL:
   ```
   VITE_ENV_SERVER_URL=http://localhost:{YOUR-PORT}
   ```

5. **Start the Frontend Development Server**  
   Finally, run the following command to start the Vite development server:
   ```bash
   npm run dev
   ```

--- 

With these steps, your backend (Node.js, MySQL) and frontend (Vite, React) environments will be properly set up for development.



images:

![Ekran görüntüsü 2024-09-17 142018](https://github.com/user-attachments/assets/091f18d0-d101-4d2e-999b-9e614c4232b6)


![Ekran görüntüsü 2024-09-17 142045](https://github.com/user-attachments/assets/09fdb7d0-8075-488b-afa2-ce520a10d71b)


![Ekran görüntüsü 2024-09-17 142123](https://github.com/user-attachments/assets/8bae1c00-b1ff-4eaf-ab6f-45836dbc111f)


![Ekran görüntüsü 2024-09-17 142313](https://github.com/user-attachments/assets/e96ddd10-4d3c-4061-9ce7-a28650f4efeb)


![Ekran görüntüsü 2024-09-17 142331](https://github.com/user-attachments/assets/89d05355-5814-48b5-9dc2-8f3b81b9c4c5)


![Ekran görüntüsü 2024-09-17 142339](https://github.com/user-attachments/assets/abbc6700-df73-4047-baaf-e3e70cd808b6)


![Ekran görüntüsü 2024-09-17 142352](https://github.com/user-attachments/assets/22c1f465-b076-43c6-a300-10f755818d32)


![Ekran görüntüsü 2024-09-17 142359](https://github.com/user-attachments/assets/4b1cbd51-b8f9-401d-a7c0-aa8929ee6fec)


![Ekran görüntüsü 2024-09-17 142428](https://github.com/user-attachments/assets/b49b7f44-e902-4c3f-ad26-a673c530ca08)
