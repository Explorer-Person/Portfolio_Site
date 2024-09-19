# Personal Customizable Portfolio Site

## **Sites Have**
- **[Front-End By React](#front-end-by-react)**
- **[Back-End Service By Node.js](#back-end-service-by-nodejs)**
- **[Connections By Axios](#connections-by-axios)**

## **Front-End Contents**
- **[Axios For Server Connections](#axios-for-server-connections)**
- **[Redux For Front Data Management](#redux-for-front-data-management)**
- **[Core Created By Vite](#core-created-by-vite)**
- **[Written By TypeScript](#written-by-typescript)**
- **[Data is Sent in Multiple Formats: FormData or JSON](#data-is-sent-in-multiple-formats-formdata-or-json)**


 
## **Back-End Contents**
### **Packages**
- **[Express For Backend Logic](#axios-for-server-connections)**
- **[Express-Session For Creating Auto Session When Auth Success](#axios-for-server-connections)**
- **[Express-MySQL-Session For Integrate MySQL With Express-Session to Storing Session Datas in MySQL](#axios-for-server-connections)**
- **[Express-Validator For Validate and Sanitize Incoming HTML Data](#axios-for-server-connections)**
- **[ffmpeg For Formatting Videos](#axios-for-server-connections)**
- **[Jimp For Image Formatting](#axios-for-server-connections)**
- **[CORS For Restricting Api Access](#axios-for-server-connections)**
- **[Helmet For Securing Response Headers](#axios-for-server-connections)**
- **[Module-Alias for Escaping Absolute Path ../../ Issue](#axios-for-server-connections)**
- **[Morgan For Logging Requests](#axios-for-server-connections)**
- **[Multer For Accepting FormData and Parse Media Data](#axios-for-server-connections)**
- **[uuid For Creating Unique ID](#axios-for-server-connections)**
- **[Nodemon For Executing Server On Dev and it give resistance to server for any change and getting more easy development env](#axios-for-server-connections)**
- **[Cookie-Parser Can Easily Interprets Incoming Cookies With Authorized Requests](#axios-for-server-connections)**
- **[Bcryptjs For Encrypt Passwords Before Saving On DB](#axios-for-server-connections)**

### **Architecture**

- **[/controller receives requests from routers and manages responsing logic](#axios-for-server-connections)**
- **[/routes receives requests forehand and transfer them according to assigned controller by endpoint](#axios-for-server-connections)**
  ***[It receives four (data, process, status, statusCode) parameters and send them to client accordingly](#axios-for-server-connections)***
  ***[Also one more func named with dbResponseHandler, it manages db query responses and transfer them to controller, its parameters (message, statusCode, process, query, params, model) . ](#axios-for-server-connections)***
- **[/db includes core mysql db logics like create db if not exists, or check first is there any db? also there is func named executeQuery(query, parameters) for simplifying creating queries](#axios-for-server-connections)**
- **[/middlewares includes /auth, /cors, /helmet, /resizer(jimp), /multer base logics ](#axios-for-server-connections)**
- **[/utils includes /dataFormatter, /queryExecuter and /htmlSanitizer  ](#axios-for-server-connections)**
- **[/validators includes validator logic for every kind of json datas that comin from client and have one validation result func for sending validator results ](#axios-for-server-connections)**
- **[/queries have all query operations that communicating with mysql db and exploiting dbResponseHandler() which func using queryExecuter()  ](#axios-for-server-connections)**
- **[/models includes whole formats of mysql tables  ](#axios-for-server-connections)**
- **[/tests for testing and getting log of middlewares for debugging  ](#axios-for-server-connections)**
 *CONTINUE..
- 
  
