const AppError = require("../utilts/AppError")



const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    }
    )
}
const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        errors: err.errors,
        message: err.message,
    })
}

const errorControllers = (err, req, res, next) => {
    console.log(err)
    console.log(err.stack)

    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    const prod = process.env.NODE_ENV === "prod"
    const dev = process.env.NODE_ENV === "dev"

    if (prod) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            })

        } else {
            // let error = err
            let error = Object.create(err)
            console.log(err)


            if (error.name === "SequelizeDatabaseError") {
                if (err.original.code === "22P02") {
                    error = new AppError("Cast error", 400)
                }
            }


            if (error.name === "SequelizeUniqueConstraintError") {
                if (err.original.code === "23505") {
                    error = new AppError("bunday malumot bazada mavjud", 400)
                }
            }


            if (error.name === "ValidationError") {
                error.errors = error.errors.map(e => e.msg)
            }
            if (error.name === "TokenExpiredError") {
                error = new AppError(`Iltimos qaytadan avtorizatsiyadan o\`ting`, 409)
            }
            sendErrorProd(error, res)
        }


    }
    else if (dev) {
        sendErrorDev(err, res)
    }
}
module.exports = errorControllers