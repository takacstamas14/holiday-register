import {DataTypes, Sequelize} from "sequelize";
import db from "../config/index.js";
import User from "./User.js";
const Holiday = db.define('holidays',{
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

User.belongsToMany(Holiday,{through: {model: Holiday,unique: false}})
Holiday.belongsToMany(User,{through: {model: User,unique: false}})

export default Holiday;