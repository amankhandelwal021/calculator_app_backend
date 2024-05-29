const jwt = require("jsonwebtoken");
const AuthUser = require("../models/authenticationModel");

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        if (!token) {
            res.status(404).json({ message: "sorry, cannot verify the user" });
        }
        const validUser = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);

        if (!validUser) {
            res.status(404).json({ message: "sorry, user does not exist" });
        }
        const user = await AuthUser.findById({ _id: validUser._id })
        if (!user) {
            res.status(404).json({ message: "sorry, user not found" });
        }
        else {
            req.body.userId = validUser._id;
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(403).json(error);
    }

};

module.exports = auth;