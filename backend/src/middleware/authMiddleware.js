import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        console.log(req.headers.authorization);

        token = req.headers.authorization.split(" ")[1];

        console.log(token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("TOKEN:", token);
        console.log("DECODED:", decoded);

        req.user = await User.findById(decoded.id)
            .select("-password");

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default protect;