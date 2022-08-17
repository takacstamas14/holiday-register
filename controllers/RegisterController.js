import Holiday from "../models/Holiday.js";
import User from "../models/User.js";

export const saveDate = async (req,res) => {

    try {
        if(req.body.startDate && req.body.endDate) {
            const holiday = await Holiday.create({
                "startDate": req.body.startDate,
                "endDate": req.body.endDate,
                "userId": req.session.userId,
                "title": req.body.title
            });
            return res.status(200).json({msg: "created"});
        } else {
            return res.status(500).json({msg: "failed"});
        }

    } catch (e)
    {
        res.status(500).json({msg: e});
    }
}

export const getRegistered = async (req,res) => {
    function renameKey ( obj, oldKey, newKey ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    try {
        User.belongsToMany(Holiday, { foreignKey: 'userId', through: Holiday });
        Holiday.belongsToMany(User, { foreignKey: 'userId', through: Holiday });

        const registered = await Holiday.findAll({
            attributes: ['id','title','startDate', 'endDate'],
            include: [{
                model: User,
                required: true
            }]
        });

        /*for(let i = 0; i < registered.length; i++)
        {
            const user = await User.findAll({
                where: {
                    id: registered[i].userId
                }
            });
            registered[i].fullName = user[0].fullName;
        }*/
        //console.log(user);
        const registeredString = JSON.stringify(registered);
        const arr = JSON.parse(registeredString);
        arr.forEach( obj => renameKey( obj, 'startDate', 'start' ) );
        arr.forEach( obj => renameKey( obj, 'endDate', 'end' ) );
        //arr.forEach( obj => obj.userName = user[0].fullName);
        arr.forEach( obj => obj.start = obj.start.split('.')[0]);
        arr.forEach( obj => obj.end = obj.end.split('.')[0]);

        return res.status(200).json(arr);
    } catch (e) {
        return res.status(500).json({msg: e});

    }
}


export const getRegisteredByMe = async (req,res) => {
    function renameKey ( obj, oldKey, newKey ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    try {
        const registered = await Holiday.findAll({
            attributes: ['id','title','startDate', 'endDate'],
            where: {
                "userId": req.session.userId
            }
        });
        const user = await User.findAll({
            where: {
                id: req.session.userId
            }
        });
        console.log(user);
        const registeredString = JSON.stringify(registered);
        const arr = JSON.parse(registeredString);
        arr.forEach( obj => renameKey( obj, 'startDate', 'start' ) );
        arr.forEach( obj => renameKey( obj, 'endDate', 'end' ) );
        //arr.forEach( obj => obj.title = user[0].fullName);
        arr.forEach( obj => obj.start = obj.start.split('.')[0]);
        arr.forEach( obj => obj.end = obj.end.split('.')[0]);
        return res.status(200).json(arr);
    } catch (e) {
        return res.status(500).json({msg: e});

    }
}

