import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Holiday from "../models/Holiday.js";
import bcrypt from "bcrypt";
import session from "express-session";

export const login = async(req,res) => {

    try {
        const user = await User.findAll({
            where: {
                username: req.body.username
            }
        });
        if(user.length === 0) {
            return res.status(401).json({msg: "Wrong username or password"});
        }
        const validPw = await bcrypt.compare(req.body.password,user[0].password);
        if(!validPw) {
            return res.status(401).json({msg: "Wrong username or password"});
        }
        req.session.userId = user[0].id;
        return res.status(200).json({msg: "You are now logged in."});

    } catch (err) {

        return res.status(500).send(err);
    }
};

export const logout = async(req,res) => {
    req.session.destroy();
    res.status(200).json({"msg": "Logged out."})
};