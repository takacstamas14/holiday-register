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
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
    title:{
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

//User.belongsToMany(Holiday,{through: {model: Holiday,unique: false}})
//Holiday.belongsToMany(User,{through: {model: User,unique: false}})

export default Holiday;