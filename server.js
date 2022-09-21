const dotenv = require("dotenv")
dotenv.config();
const app = require("./app")
const db = require('./config/database/db')

const PORT = process.env.PORT || 2022

const start = async () => {
    try {
        await db.authenticate()
        console.log("database connection...")
        await db.sync({ underscore: true, force: true }),
            app.listen(PORT, () => {
                console.log(`Server Started on port ${PORT}...`)
            })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()