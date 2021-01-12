const express = require("express")
const comments_controller = require("../controllers/comments_controller")

const commentsRouter = express.Router()

commentsRouter.get("/all", comments_controller.getComments)

commentsRouter.post("/new", comments_controller.commentPost)

module.exports = commentsRouter
