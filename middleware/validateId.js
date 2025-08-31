const mongoose = require("mongoose")

const validateId =  (req,res,next)=> {
    const categoryId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return resizeBy.status(400).json({message: "invalid id "})
    }
    next()
}

module.exports = validateId