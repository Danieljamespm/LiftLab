const User = require("../models/User")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
}


module.exports = {
    registerUser,
}