const Category = require('../models/category.model')
const mongoose = require("mongoose")

exports.createCategory = async (req,res) => {
    try {
        const {name , description} = req.body
        if (!name || !description) {
            return res.status(400).json({message : "All Fields required"})
        }
        const newCategory = await Category.create({
            name, 
            description
        })
        return res.status(201).json({message : "category created with success", newCategory})
    } catch (error) {
        console.error("error", error.message)
        return res.status(500).json({message : "Internal server error", error : error.message})
    }
}

exports.getAllCategories = async (req,res) => {
    try {
        const allCategories = await Category.find()
        if (allCategories.length === 0) {
            return res.status(404).json({message : "No categories found "})
        }
        return res.status(200).json(allCategories)
    } catch (error) {
       console.error("Error getting all categories:", error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.getCategoryById = async(req,res) => {
    try {
        const categoryId = req.params.id
        const findCategory = await Category.findById(categoryId)
        if (!findCategory) {
            return res.status(404).json({message : "Category Not Found"})
        }
        return res.status(200).json(findCategory)
        
    } catch (error) {
        console.error("Error getting category by ID:", error.message)
        return res.status(500).json({message : "internal server error", error: error.message})
    }
}

exports.updateCategory = async (req,res) =>{
    try {
        const categoryId = req.params.id
        const {name , description} = req.body
        if(!name || !description){
            return res.status(400).json({message : "All Fields required"})
        }
        const updateCategory = await Category.findByIdAndUpdate(categoryId, {name, description}, {new : true})
        if(!updateCategory) {
            return res.status(404).json({message : "Not Found"})
        }
        res.status(200).json(updateCategory)
    } catch (error) {
        console.error("Error updating category:", error.message)
        return res.status(500).json({message : "internal server error", error: error.message})
    }
}


exports.deleteCategory = async (req,res) => {
    try {
        const categoryId = req.params.id
        const deleteCategory = await Category.findByIdAndDelete(categoryId)
        if (!deleteCategory) {
            return res.status(404).json({message : "Not Found"})
        }
        return res.status(200).json({message : "category deleted"})
    } catch (error) {
        console.error("Error deleting category:", error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}