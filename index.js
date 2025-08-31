const express = require("express")
require("dotenv").config()
const app = express()
const port  = process.env.PORT || 5000
const db = require("./config/db")
const categoriesRouter = require("./routes/categories.route")
// middleware 
app.use(express.json())


// categories router
app.use("/api/v1/categories", categoriesRouter)

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});


const startServer = async (req,res) => {
    try {
        await db.connectdb()
        app.listen(port, () => {
            console.log("server is running on port:", port)
        })
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1)
    }
}
startServer()
// app.listen(port, () => {
//     try {
//         db.connectdb()
//     } catch (error) {
//         console.log(error)
//     }
//     console.log(`server running on port : ${port}`)
// })