To create a more aesthetic and organized view for your Markdown (`.md`) file, consider the following improvements:

### General Enhancements
- **Improve readability** by using bullet points, ordered lists, and clear sections.
- **Use consistent headings** for better hierarchy and structure.
- **Include code blocks** for examples and explanations where relevant.
- **Add styling elements** (bold, italic) to highlight important points.
- **Avoid redundancy** in linking references and sections.

Here is a detailed and more aesthetic version of your `.md` file:

---

# Personal Customizable Portfolio Site

## **Contents**
1. [Front-End By React](#front-end-contents)
2. [Back-End By Node.js](#back-end-contents)
3. [Connections Using Axios](#connections-by-axios)

---

## **Front-End Contents**

### **Key Features**
- **Axios** for server connections and handling HTTP requests.
- **Redux** for state management and data flow.
- **Vite** as the build tool for fast development.
- **TypeScript** for static typing and scalability.
- **Data formats**: Handles both `FormData` and `JSON`.

---

## **Back-End Contents**

### **Key Packages**
- **Express**: Backend framework for routing and middleware handling.
- **Express-Session**: Automatically creates sessions on successful authentication.
- **Express-MySQL-Session**: Integrates MySQL with sessions.
- **Express-Validator**: Validates and sanitizes incoming data.
- **FFmpeg**: For video processing.
- **Jimp**: Handles image processing and formatting.
- **CORS**: Controls API access based on origins.
- **Helmet**: Secures HTTP headers.
- **Module-Alias**: Resolves path issues in module imports.
- **Morgan**: Logs requests for debugging and monitoring.
- **Multer**: Handles file uploads via `FormData`.
- **UUID**: Generates unique IDs.
- **Nodemon**: Provides a live development environment with automatic server restarts.
- **Cookie-Parser**: Parses and manages cookies.
- **Bcryptjs**: Encrypts passwords before storing them in the database.

### **Architecture**
- **Controller Layer**: Handles request logic and interaction with the database.
  - `/admin`: CRUD operations for admin.
  - `/skills`: CRUD operations for skills.
  - `/projects`: CRUD operations for projects.
  - `/projectImages`: Handles image processing related to projects.
  - `/abilities`: CRUD operations for abilities.
  
    Example of an API call:
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

- **Routing Layer**: Defines request routes and maps them to the corresponding controller functions.
  - `/authorized`: Manages routes requiring authentication.
  - `/unauthorized`: Handles public routes like login and signup.

    Example:
    ```javascript
    router.post("/addOne", multer.fileUploader, projectsValidator, resizer, validationResult, addProject);
    ```

- **Database Layer**: Manages MySQL operations.
  - **Core DB Logic**: 
    - Create DB if it doesn't exist.
    - Query execution via `executeQuery(query, parameters)`.

- **Middleware Layer**: Implements various middlewares.
  - **Authentication**: Manages session setup and authorization.
  - **CORS**: Allows requests only from authorized origins.
  - **Helmet**: Custom configuration to secure headers.
  - **Resizer**: Resizes media files using `Jimp` (for images) or `FFmpeg` (for videos).
  - **Multer**: Handles media uploads and validations.

---

## **Utils**
- **Data Formatter**: Converts incoming database arrays into a structured format:
  ```javascript
  [
    ...dbData
  ]  
  → 
  [
     id: id,
     fk: fk,
     info: {
      ...dbData
    }
  ]
  ```

- **HTML Sanitizer**: Uses the `escape-html` package to protect against XSS.
- **Query Executor**: Automates database query execution:
  - `dbResponseHandler() → queryExecuter() → executeQuery()`

---

## **Validators**
Handles incoming data validation from client inputs. Example of a validator:
```javascript
const validator = [
  body('data.info.title')
    .trim()
    .replace(/<\/?[^>]+(>|$)/g, "")
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ max: 100 }).withMessage('Title must be less than 100 characters')
    .escape(),
];
```
- `/abilities`: Validates abilities data.
- `/admin`: Validates admin data.
- `/projects`: Validates project data.

---

## **Front-End Architectures**

- **/src**: Main directory for front-end.
  - **/assets/images**: Stores images used across the web pages.
  - **/components**: Reusable components.
    - **/alertBox**: Displays aesthetic alerts.
    - **/confBox**: A configurable box with inputs, connected to an input generator for dynamic forms.
    - **/customButton**: General-purpose button for actions or requests.
    - **/detailBox**: Displays detailed project information.
    - **/fileDisplay**: Shows file info on the UI.
    - **/loadingEffect**: Provides customizable loading animations.
  - **/pages**: Divided into various sections.
    - **/auth**: Manages login and signup pages.
    - **/error**: Contains error pages (e.g., 404, unauthorized access).
    - **/home**: Home page with introduction, abilities, and skills.
    - **/project**: Displays project and project images.

---

### **Back-End Queries**

- **/queries**: Contains query logic for each module.
  - **/admin**: Admin-related queries.
  - **/projects**: Project-related queries.
  
    Example:
    ```javascript
    getOne = async (id) => {
        const query = "SELECT * FROM abilities WHERE id=?";
        const param = [id];
        return dbResponseHandler(null, 200, "getOne", query, param, abilitiesModel());
    };
    ```

---

### **Tests**
- **/tests**: Includes tests for middlewares and other functionality for debugging purposes.

---

### **Additional Tools**
- **Redux**: State management tool.
- **React-Router-Dom**: For routing between pages.
- **React-Bootstrap**: Provides UI components for styling.

---

This structure enhances the readability, flow, and clarity of your Markdown file. Additionally, it ensures that key information is easy to find and navigate through links, making your portfolio more accessible and professional.
