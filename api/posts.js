const express = require("express")
const posts_controller = require("../controllers/posts_controller")
const fileUpload = require("../middleware/file-upload")

const postsRouter = express.Router()

postsRouter.get("/all", posts_controller.getPosts)

postsRouter.post(
  "/new",
  fileUpload.single("image"),
  posts_controller.createPost
)

postsRouter.get("/:uid", posts_controller.getPostbyUID)

module.exports = postsRouter
