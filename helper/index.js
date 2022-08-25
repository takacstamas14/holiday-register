import User from "../models/User.js";

export const verifySession = (req,res,next) => {
    if(req.session.userId == null) return res.status(401).json({msg: "Please log in.",errorCode: 1});
    next();
};
export const verifyAdminSession = async (req,res,next) => {
    if(req.session.userId == null)
    {
        return res.status(401).json({msg: "Please log in.",errorCode: 1});
    }
    const adminUser = await User.findAll({
        where: {
            id: req.session.userId,
            role: "admin"
        }
    });
    if(!adminUser[0])
    {
        return res.status(401).json({msg: "Please log in.",errorCode: 1});
    }
    next();
}