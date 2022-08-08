import express from 'express';
import db from './config/index.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./routes/index.js";
import * as path from "path";
import {fileURLToPath} from 'url';
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
        cookie: {
            httpOnly: false,
            maxAge: 60 * 60 * 24,
            expires: 60 * 60 * 24
        },

    })
);
app.use(router);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pub = path.join(__dirname, 'public','build');
app.use(express.static(pub));
db.sync({alter: true, force: true}).then(result => {
    app.listen(process.env.PORT || 5000);
    //app.listen(3001, () => {console.log("running server");});
}).catch(err => {
    console.log(err);
})