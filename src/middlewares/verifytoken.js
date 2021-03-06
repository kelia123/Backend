import TokenAuth from "../helpers/tokenAuth";
import userInfos from "../models/user"
const isUserExist = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(400).json({ error: "no token provided" })
        }
        const data = TokenAuth.getDataFromToken(token)
        const { name } = data
        if (name === "JsonWebTokenError") {
            return res.status(400).json({ error: "Invalid JWT token" })
        }
        if (name === "TokenExpiredError") {
            return res.status(400).json({ error: "Token is expired" })
        }

        req.user = data.user;
        const user = await userInfos.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: "User not found, you are not authorized" })
        }

        return next();
    }
    catch (err) {
        console.log(err);
    }
}
export default isUserExist;










