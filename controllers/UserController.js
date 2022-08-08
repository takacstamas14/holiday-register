import { Sequelize } from "sequelize";
import User from "../models/User.js";
import Holiday from "../models/Holiday.js";
import bcrypt from "bcrypt";
import session from "express-session";

export const login = async(req,res) => {

    try {
        const user = await User.findAll({
            where: {
                emailAddress: req.body.emailAddress
            }
        });
        if(user.length === 0) {
            return res.status(401).json({code: 1, msg: "Wrong username or password"});
        }
        const validPw = await bcrypt.compare(req.body.password,user[0].password);
        if(!validPw) {
            return res.status(401).json({code: 1, msg: "Wrong username or password"});
        }
        req.session.userId = user[0].id;
        req.session.role = user[0].role;
        return res.status(200).json({code: 0, msg: "You are now logged in."});

    } catch (err) {

        return res.status(500).send(err);
    }
};

export const logout = async(req,res) => {
    req.session.destroy();
    res.status(200).json({"msg": "Logged out."})
};

export const addAdmin = async(req,res) => {
    const password = bcrypt.hash("user123",10,async (err,hash) => {
        await User.create({
            "fullName": "Takács Tamás",
            "emailAddress": "takacst7200@gmail.com",
            "password": hash,
            "role": "admin"
        });
    });
    return res.status(200).json({msg: "admin account created"})
};

export const userinfo = async (req,res) => {
    const user = await User.findAll({
        where: {
            id: req.session.userId
        }
    });
    return res.status(200).json({user: user});
}