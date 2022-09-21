const express = require("express");
const attachmentControllers = require("../controllers/attachmentControllers");
const { attachmentValidator } = require("../middleware/expressValidator");
const router = express.Router()

router
    .route("/")
    .post(attachmentValidator, attachmentControllers.createAttachment);

router
    .route("/:id")
    .put(attachmentValidator, attachmentControllers.updateAttachment)
    .delete(attachmentControllers.deleteAttachment)

module.exports = router