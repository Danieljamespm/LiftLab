const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "Routine route is working"
    })
})

router.post("/", (req, res) => {
    console.log(req.body)

    res.json({
        message: "Routine recieved",
        routine: req.body,
    })
})


module.exports = router