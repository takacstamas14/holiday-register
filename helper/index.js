export const verifySession = (req,res,next) => {
    if(req.session.userId == null) return res.status(401).json({msg: "Please log in."});
    next();
};
