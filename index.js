import express from 'express';
import db from './config/index.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./routes/index.js";
import * as path from "path";
import {fileURLToPath} from 'url';
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User.js";
const app = express()


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
        key: "userId",
        secret: "secretkey",
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 1000,
            expires: 60 * 60 * 24 * 1000
        },
    })
);
app.use(router);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pub = path.join(__dirname, 'public','build');
console.log(pub);
app.use(express.static(pub));
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'build', 'index.html')));
db.sync({alter: true, force: true}).then(result => {
    console.log("Teszt");

    const password = bcrypt.hash("user123",10,async (err,hash) => {
        await User.create({
            "fullName": "Admin",
            "emailAddress": "takacst7200@gmail.com",
            "password": hash,
            "role": "admin"
        });
        const password = bcrypt.hash("user123",10,async (err,hash) => {
            await User.create({
                "fullName": "User",
                "emailAddress": "tmstkcs@gmail.com",
                "password": hash,
                "role": "user"
            });
        });
        console.log("teszt1");

    });
    app.listen(process.env.PORT || 5000);
    //app.listen(3001, () => {console.log("running server");});
}).catch(err => {
    console.log(err);
})
