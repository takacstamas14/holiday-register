import express from "express";
import {login,logout} from "../controllers/UserController.js";/*
import {getRooms} from "../controllers/RoomController.js";
import {bookRoom,getBookings,removeBooking} from "../controllers/BookController.js";
import {verifySession} from "../helper/index.js";*/

const router = express.Router();

/*
* User Routes
*/
router.get("/",(req, res) => {
    res.status(200).json({"msg":"ok"});
})
router.post("/api/login",login);
/*router.get("/api/logout",verifySession,logout);
router.get("/api/user");
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
*/

export default router;