const express = require("express")
const router  = express.Router()
const categoriesController = require("../controllers/categories.controller")
const validateId = require("../middleware/validateId")


router.get("/", categoriesController.getAllCategories)
router.get("/:id",validateId, categoriesController.getCategoryById)
router.post("/", categoriesController.createCategory)
router.put("/:id",validateId, categoriesController.updateCategory)
router.delete("/:id", validateId,categoriesController.deleteCategory)

module.exports = router