require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const routineRoutes = require("./routes/routineRoutes")
const userRoutes = require("./routes/userRoutes")
const workoutRoutes = require("./routes/workoutRoutes")



const app = express()

const PORT = process.env.PORT || 5000

connectDB()


app.use(express.json())
app.use(cors())

app.use("/api/routines", routineRoutes)
app.use("/api/users", userRoutes)
app.use("/api/workouts", workoutRoutes)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})