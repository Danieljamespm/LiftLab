

const getRoutines = (req, res) => {
    res.json({
        message: "Routine route is working"
    })
}

const createRoutine = (req, res) => {
    res.json({
        message: "Routine recieved"
    })
}
















module.exports = {
    getRoutines,
    createRoutine,

}