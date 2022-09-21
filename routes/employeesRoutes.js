const express = require("express")
const joinUser = require("../controllers/addEmployeesByAdminControllers")
const { register: createPerson } = require("../middleware/expressValidator")
const router = express.Router()

router
    .route("/")
    .get(joinUser.getAllPersons)
    .post(createPerson, joinUser.createUser)

module.exports = router