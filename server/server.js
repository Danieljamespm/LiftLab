require("dotenv").config()

const express = require("express")

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("LiftLab Backend is alive")
})

app.get("/api/test", (req, res) => {
    res.json({
        message: "LiftLab API is working with nodemon"
    })
})

app.get("/api/routines", (req, res) => {
    res.json({
        message: "Routine route is working"
    })
})

app.post("/api/routines", (req, res) => {
    console.log(req.body)

    res.json({
        message: "Routine recieved",
        routine: req.body,
    })
})

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`)
})