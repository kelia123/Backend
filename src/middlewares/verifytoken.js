import TokenAuth from "../helpers/tokenAuth";
const verifyToken = async(req,res,next) => {
    const token = req.header("x-auth-token");
    // x-auth-token is a variable that will hold our token in header of request in postman
    if(!token){
        return res.status(404).json({
            status:404,
            message:"no token provided"
        })
    }
    try{
        const user = TokenAuth.getDataFromToken(token);
        
        req.user = user.user;
        return next();
    }catch(err){
        console.log("<><><><><><>",err);
    }
    }
    export default verifyToken;