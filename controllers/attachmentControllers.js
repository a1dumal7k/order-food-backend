const { validationResult } = require("express-validator")
const Attachment = require("../models/Attachment")
const catchAsync = require("../utilts/catchAsync")

exports.createAttachment = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const newImage = await Attachment.create(req.body)
    res.status(201).json({
        status: "succesfull",
        message: "Attachment created",
        error: "",
        data: {
            newImage
        }
    })
})

exports.updateAttachment = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const { id } = req.params;
    const attachmentById = await Attachment.findByPk(id);
    if (!attachmentById) {
        return next(`bunday ID - ${id} li rasm topilmadi`, 404)
    }
    await attachmentById.update(req.body)


    res.status(203).json({
        status: "succesfull",
        message: "Attachment updated",
        error: "",
        data: null
    })
})

exports.deleteAttachment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const attachmentById = await Attachment.findByPk(id);
    if (!attachmentById) {
        return next(`bunday ID -  ${id} li rasm topilmadi`, 404)
    }
    attachmentById.destroy()
    res.status(203).json({
        status: "succesfull",
        message: "Attachment deleted",
        error: "",
        data: null
    })
})