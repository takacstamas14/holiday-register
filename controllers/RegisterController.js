import Holiday from "../models/Holiday.js";
import User from "../models/User.js";

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

export const getRegistered = async (req,res) => {
    function renameKey ( obj, oldKey, newKey ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    try {
        const registered = await Holiday.findAll({
            attributes: ['id','startDate', 'endDate']
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
        arr.forEach( obj => obj.title = user[0].fullName);
        arr.forEach( obj => obj.start = obj.start.split('.')[0]);
        arr.forEach( obj => obj.end = obj.end.split('.')[0]);
        res.status(200).json(arr);
    } catch (e) {
        res.status(500).json({msg: e});

    }
}