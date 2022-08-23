import express from "express";
import {login, logout, addAdmin, userinfo, getAllUser, createUser, addUser} from "../controllers/UserController.js";/*
import {getRooms} from "../controllers/RoomController.js";
import {bookRoom,getBookings,removeBooking} from "../controllers/BookController.js";*/
import {verifyAdminSession, verifySession} from "../helper/index.js";
import {saveDate, getRegistered, getRegisteredByMe} from "../controllers/RegisterController.js";

const router = express.Router();

/*
* User Routes
*/
/*router.get("/",(req, res) => {
    res.status(200).json({"msg":"ok"});
})*/
router.post("/api/login",login);
router.get("/api/userInfo",verifySession,userinfo);
router.post("/api/createUser",verifyAdminSession,createUser);
router.get("/api/getAllUsers",verifyAdminSession,getAllUser);
router.get("/api/logout",verifySession,logout);
//router.post("/api/addAdmin",addAdmin);
//router.post("/api/addUser",addUser);
router.post("/api/saveDate",verifySession,saveDate);
router.get("/api/getRegistered",verifySession,getRegistered);
router.get("/api/getRegisteredByMe",verifySession,getRegisteredByMe);
/*router.get("/api/user");
router.get("/api/users");
router.post("/api/user");
router.put("/api/user");
router.delete("/api/user",verifySession,removeBooking);

/*
* Holiday Routes
*/
/*router.get("/api/holiday",getRooms);
router.post("/api/holiday",verifySession,bookRoom);
router.delete("/api/holiday",verifySession,removeBooking);

//Get all holidays
router.get("/api/holidays",verifySession,getBookings);

addAdmin();
addUser();*/
export default router;