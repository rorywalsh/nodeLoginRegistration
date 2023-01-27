const express = require('express');
const mysql = require("mysql")
const path = require("path")
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.set('view engine', 'hbs')

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/auth/login", (req, res) => {   
    const { email, password} = req.body;

    db.query('Select * from userTable where email = ?', [email], async (error, result) => {
        if(error){
            console.log(error);
        }else{
            console.log(result);
        }

        if (result.length <= 0) {
            console.log("No results"); //Is this recommended?
        }


        //let hashedPassword = await bcrypt.hash(password, 8);
        let hashedPassword = result[0].password;

        if (await bcrypt.compare(password, hashedPassword)) {
            console.log("---------> Login Successful")
            return res.render('login', {
                message: 'User logged in successfully..'
            })
        }
        else{
            return res.render('login', {
                message: 'User sucks'
            })
        } 
    })
})


app.post("/auth/register", (req, res) => {    
    const { email, password, password_confirm } = req.body

    // userTable in this context is the name of the sql table entry
    db.query('SELECT email FROM userTable WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }else{
            console.log(result);
        }

        if( result.length > 0 ) {
            return res.render('register', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return res.render('register', {
                message: 'This email is already in use'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        console.log(hashedPassword)
       
        db.query('INSERT INTO userTable SET?', {email: email, password: hashedPassword}, (err, result) => {
            if(error) {
                console.log(error)
            } else {
                console.log(error);
                return res.render('register', {
                    message: 'User registered!'
                })
            }
        })        
    })
})

app.listen(5000, ()=> {
    console.log("server started on port 5000")
})