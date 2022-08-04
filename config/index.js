import {Sequelize} from "sequelize";
//const db = new Sequelize('postgres://ihbmtxjpcedtwx:3f00172acb811a67092e5d836b85215806eb0d250d4fe6c75b2a6d5d606d7485@ec2-52-208-164-5.eu-west-1.compute.amazonaws.com:5432/dd11a4iv7pf7ge') // Example for postgres
const db = new Sequelize('postgres://ihbmtxjpcedtwx:3f00172acb811a67092e5d836b85215806eb0d250d4fe6c75b2a6d5d606d7485@ec2-52-208-164-5.eu-west-1.compute.amazonaws.com:5432/dd11a4iv7pf7ge', {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


export default db;