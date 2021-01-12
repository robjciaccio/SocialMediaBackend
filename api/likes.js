const express = require("express")
const likes_controller = require("../controllers/likes_controller")

const likesRouter = express.Router()

likesRouter.get("/all", likes_controller.getLikes)

likesRouter.post("/new", likes_controller.likePost)

likesRouter.delete("/remove", likes_controller.unLikePost)

module.exports = likesRouter
