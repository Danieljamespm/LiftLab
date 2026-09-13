require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const routineRoutes = require("./routes/routineRoutes")
const userRoutes = require("./routes/userRoutes")



const app = express()

const PORT = process.env.PORT || 5000

connectDB()


app.use(express.json())

app.use("/api/routines", routineRoutes)
app.use("/api/users", userRoutes)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})