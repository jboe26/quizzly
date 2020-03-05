Quizzly
A Mongoose, Express, Node authentication app. Simply done for learning purposes.

Table of contents
Live
About this project
Getting started
Structure of the project
Screenshots
Technologies used to create app
Backend technologies
Frontend technologies
Design improvements


About this project
How the app works
How the app is built
How the app works
This project allows a user to signup for the quiz service. Then, the user can login to the website with their stored credentials.

How the app is built
This project uses Mongodb(Mongoose), Node, Express. Node and Express are used to query and route data in the application. Express is the backend web framework used for this application, and HTML on the frontend.

Getting started
The following section will take you through the steps of setting up this application and getting it running locally on your computer.

To set up this application locally on your computer, perform the following steps:

Clone the repository
Install Node.js
Install the dependencies
Install Mongodb
Set up a development database
Verify database connection information
Start the server
1. Clone the repository
The first step is to clone the project repository to a local directory on your computer. To clone the repository, run the following commands:

  git clone https://github.com/jboe26/quizzly.git
  cd quizzly
Structure of the project
After you clone the repository, navigate to the project root directory. The project directory structure is set up as follows:

server.js: This file does the following:

Defines and requires the dependencies, including express, morgan, and mongoose.
Sets up the Express server.
Sets up the Express server to handle data parsing using body-parser.
Points the server to the API routes, which gives the server a map of how to respond when users visit or request data from various URLs.
Defines the port the server is listening on.
Starts the server.
Allows the app to serve static content from the public directory.
public: Contains the static content (images, Javascript, and CSS).

privateViews: Contains the static content that can only be seen when user is logged in.

The login.html and signup.html are forms that post to their respective routes on submit. Routes are in server.js

models: Contains a file called user.js, which contains the schema sent to the database, functions used to manage the application data and interact with the database.

package.json: Lists the project dependencies (third party npm packages) and their version numbers.
.gitignore: Anything listed inside this file will not be tracked by GitHub when code is committed.
package-lock.json: Dependency tree for the project. Lists all the dependencies and their versions.
2. Install Node.js
If you don't already have Node.js installed on your computer, you can install the latest version here: https://nodejs.org/en/.

3. Install the dependencies
The following npm packages are dependencies to the project.

After you clone the repository to a local directory, change directory to the project root directory and run the following command to install the required npm packages:

npm install
express - a Node.js web application framework (https://www.npmjs.com/package/express).
logger - HTTP request logger middleware for node.js. (https://www.npmjs.com/package/morgan)
mongoose - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. (https://www.npmjs.com/package/mongoose).
bcrypt - Dependency of user.js - A library to help you hash passwords. (https://www.npmjs.com/package/bcrypt)
client-sessions - Dependency of server.js - client-sessions is connect middleware that implements sessions in encrypted tamper-free cookies.. (https://www.npmjs.com/package/client-sessions)
Version information for each of these packages is available in the package.json file in the project root directory.

4. Install MongoDB
If you don't already have MongoDB installed on your computer, you can install the latest version here: https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/

For this project, Mongoose shell is used to visually design, create, and manage the database used to store user data.

5. Set up a development database
To set up a development database that you can use with this application, perform the following steps:

Open a terminal window run mongod. Then open another terminal window and run mongo. https://docs.mongodb.com/manual/mongo/

Execute the following statements in mongo shell:

  create database by doing:  use databasename_db;
  switch to new db: use databasename_db;
  
Running these statements creates a database called databasename_db and sets it as the current database being used.

Execute the following statement to create a collection called User.

  db.User.insert({"username":"test","password":"1234567"})
  
To show database content do: db.User.find().pretty()

Setting up userSchema go to models/user.js. This holds the functions, password encryption and comparisons and schema to be sent to the database.

6. Verify database connection information
Modify the connection properties as needed to reflect your database instance.

For example:

 var connStr = 'mongodb://localhost:27017/mon_auth';
mongoose.connect(connStr, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});
7. Start the server
After performing all of the setup steps in the Getting started section, navigate to the project root directory (burger) and run the following command to start the server:

node server.js
To verify that the server has started and the application is working locally on your computer, open Chrome and go to http://localhost:8080.

Screenshots

## Link to deployed project

[Quizzly] (https://quizzly3.herokuapp.com/main.html)



