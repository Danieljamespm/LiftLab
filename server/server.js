require("dotenv").config()

const express = require("express")
const routineRoutes = require("./routes/routineRoutes")

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/routines", routineRoutes)





app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`)
})