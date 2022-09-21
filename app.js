const express = require("express")

// Routes
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const attachmentRoutes = require("./routes/attachmentRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const userRouter = require("./routes/employeesRoutes")
// User Router
const authRoutes = require("./routes/authRoutes")
// Global Error Handler
const AppError = require("./utilts/AppError")
const errorControllers = require("./controllers/errorControllers")
const authTokenmiddleware = require("./middleware/authTokenmiddleware")

// Create Server
const app = express()

app.use(express.json())
app.use(express.static("./static"))

// Path
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/attachments", attachmentRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/carts", authTokenmiddleware, cartRoutes)
app.use("/api/v1/order", authTokenmiddleware, orderRoutes)
app.use("/api/v1/payment", authTokenmiddleware, paymentRoutes)
app.use("/api/v1/user", authTokenmiddleware, userRouter)

// All Routes
app.all("*", (req, res, next) => {
    next(new AppError(`Not found ${req.path}`, 404))
})

app.use(errorControllers)

module.exports = app