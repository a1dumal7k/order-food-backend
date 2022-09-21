
const { validationResult } = require("express-validator")
const AppError = require("./AppError")
module.exports = (req, next) => {
    const validationError = validationResult(req)
    if (!validationError.isEmpty()) {
        const err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.errros = validationError.errors;
        err.isOperational = false;
        return next(err)
    }
}