import express from 'express';
import User from './models/User.js';

import db from './config/index.js';
const app = express()

app.use(express.json());

app.listen(3001, () => {
    console.log("running server");
});
