# Happiness Meter Reference Backend API

The Happiness Meter is a full CRUD API meant to be used as a reference template for future projects.

## Major Features. 

1. Runs over HTTPS
2. Utilizes JWT tokens for authorization and security 
3. Includes full test suite using Jest 
4. Utilizes Mongoose as ODM 
5. This backend API  can be used with any front end that  supports JWT tokens in their request
6. Provides CORS handling
7. Has .http file with use with the REST client extension for VSCODE 

### Setup 

### File Structure 

 - API/routes  - contains the route files. Each route references the URL to be matched,  authorization middleware, and the function to run when the route is matched.  The functions are referenced in the controller files. 

- API/Controllers - Contains all the CRUD functions that are referenced in the route files.  This is where the majority of logic is for each CRUD function. 

- API/middleware - middleware function to verify a valid JWT token was provided with the request. 

- API / Models - mongoose models/schema for each collection 

- Cert - contains the SSL certs 

- Test - These Jest test files provide test suites for each route. Each test file uses beforeAll and afterAll function to login in users, create records and remove records. 

- Rest-test.http -  VSCODE REST client extension file. The file provides sample requests for all the supported functions. 

- server.js - base setup for express web server.  This file reads in your SSL Certs.  

- app.js - This is the main application file. File has CORS handling, connects to MongoDB, and handles and erroneous routes. 

- .env file -  required file that should contain
MONGO_DB_PW="mongo_passowred"
JWT_KEY="jwt secret key"

### Useage
In the project directory, you can run:
> npm run dev
Runs the app in the development mode.

### Contribitors
Shane Schilling - shane@sschilling.com

### Testing
Application utilizes Jest as the testing platform
> npm run test 


```
POST /users/login 200 2663.587 ms - 263
POST /users/login 200 2701.383 ms - 263
POST /happy/ 201 328.432 ms - 356
POST /users/login 200 341.082 ms - 263
GET /happy/ 200 52.959 ms - 615
GET /happy/ 401 0.230 ms - 34
 PASS  test/happy.test.js
  ✓ should return a single record (50 ms)
  GET ALL HAPPY RECORDS
    ✓ should get all happy records and return 200  (56 ms)
    ✓ should return 401 when not sent with proper user token  (2 ms)

GET /happy/60abf5d083386715d4831bde 200 48.346 ms - 210
POST /users/login 401 110.583 ms - 34
DELETE /happy/60abf5d083386715d4831bde 200 71.767 ms - 289
 PASS  test/user.test.js
  LOGIN WITH CORRECT USER & PASS SHOULD RETURN A JWT_TOKEN
    ✓ Should get a valid JWT token by posting the user creds to /login (344 ms)
  TEST INVALID LOGINS
    ✓ login with bad password should return 401 (113 ms)
    ✓ login with invalid email address should return 401 (46 ms)
  CREATE USER ERRORS
    ✓ creating a user without a valid JWT token should return a 401 error (3 ms)
    ✓ creating a user without a valid JSON should return 401 error (2 ms)
  DELETE USER ERRORS
    ✓ deleting a user with a invaild user id in the URL should return 401 (3 ms)

POST /users/login 401 44.337 ms - 34
POST /users/signup 401 0.658 ms - 34
POST /users/signup 401 0.411 ms - 34
DELETE /users/345234234 401 0.338 ms - 34
Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        4.819 s, estimated 17 s
Ran all test suites.
```

### Questions
Please direct any additonal questions to: shane@sschilling.com

