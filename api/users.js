const express = require("express")
const multer = require("multer")
const bodyParser = require("body-parser")
const fileUpload = require("../middleware/file-upload")
const usersController = require("../controllers/users_controller")

const usersRouter = express.Router()

usersRouter.get("/", usersController.getUsers)

usersRouter.post(
  "/register",
  fileUpload.single("image"),
  usersController.createUser
)

usersRouter.post("/login", usersController.login)

usersRouter.post("/image", fileUpload.single("image"), (req, res) => {
  console.log(req.files)
  console.log(req.body)
  res.status(200).json({ msg: req.files })
})

module.exports = usersRouter
