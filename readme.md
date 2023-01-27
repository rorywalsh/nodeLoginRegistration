## A simple user registration and login form hobbled together from the following tutorials:
https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64
https://blog.logrocket.com/building-simple-login-form-node-js/
https://www.vultr.com/docs/use-password-authentication-with-node-js-and-mysql/

My sincerest thanks to the authors of these tutorials. 

### Steps:

- Follow step 1, a, b, c, and d* from this tutorial:
https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64

*When you get to this step d: (d) Create a userTable in the userDB

Change the table so that it has these entities

id: INTEGER — Primary Key (PK), Not Null (NN), AutoIncrement (AI)
email: VARCHAR(45) — Not Null (NN)
password: VARCHAR (100) — Not Null (NN)

- Install nodejs, and VS Code (unless you know what you're doing with other editors/command line, etc.)

- Now clone this repository, and extract it to a folder. 

- Open VS Code select 'open folder' and open the extracted folder, i.e, the folder with the app.js file  

- Open the .env file and update the details accordingly, i.e., DATABASE_USER, DATABASE_PASSWORD and DATABASE. Save the file. 

- Now open up the terminal window in VS Code and run  these commands:   

`npm install`
`npm start`

- Now open your browser and enter the following address http://localhost:5000/

When you create a new user, you should see the user appear in the MySQL Workbench. 


