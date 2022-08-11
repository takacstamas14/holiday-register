import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Holiday from "../models/Holiday.js";
import session from "express-session";

export const saveDate = async (req,res) => {

    try {
        if(req.body.startDate && req.body.endDate) {
            const holiday = await Holiday.create({
                "startDate": req.body.startDate,
                "endDate": req.body.endDate,
                "userId": req.session.userId
            });
            res.status(200).json({msg: "created"});
        } else {
            res.status(500).json({msg: "failed"});
        }

    } catch (e)
    {
        res.status(500).json({msg: e});
    }
}