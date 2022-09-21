const { verify } = require("jsonwebtoken");
const AppError = require("../utilts/AppError")
const userRole = require("../utilts/userENUM")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return next(new AppError("Avtorizatsiyadan o`ting", 401))
    }
    const token = authHeader.slice(7)
    const user = verify(token, process.env.JWT_SECRET)
    if (!user) {
        return next(new AppError("Avtorizatsiyadan o`ting", 401))
    }

    req.user = user
    next()
}