module.exports = function (error, req, res, next) {
    return res.status(500).json({error:error.message})

}