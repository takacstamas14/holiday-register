import express from 'express';
import db from './config/index.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./routes/index.js";
import * as path from "path";
import cors from "cors";
const app = express()


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
        key: "userId",
        secret: "secretkey",
        resave: true,
        saveUninitialized: false,
        httpOnly: false,
        cookie: {
            maxAge: 60 * 60 * 24,
            expires: 60 * 60 * 24
        },

    })
);
app.use(router);
app.use(express.static("public"));
db.sync({alter: true, force: true}).then(result => {
    app.listen(process.env.PORT || 5000);
    //app.listen(3001, () => {console.log("running server");});
}).catch(err => {
    console.log(err);
})