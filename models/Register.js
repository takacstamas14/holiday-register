import {DataTypes, Sequelize} from "sequelize";
import db from "../config/index.js";
import User from "./User.js";
const Register = db.define('registers',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startDate: {
        type: DataTypes.DATEONLY
    },
    endDate: {
        type: DataTypes.DATEONLY
    }
});

User.belongsToMany(Register,{through: {model: Register,unique: false}})
Register.belongsToMany(User,{through: {model: User,unique: false}})

export default Register;