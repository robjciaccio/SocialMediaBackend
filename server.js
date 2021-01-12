const express = require("express")
const bodyParser = require("body-parser")

const { Pool, Client } = require("pg")

const app = express()
const fs = require("fs")
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})

const port = 4001

const usersRouter = require("./api/users")
app.use("/users", usersRouter)

const postsRouter = require("./api/posts")
app.use("/posts", postsRouter)

const likesRouter = require("./api/likes")
app.use("/likes", likesRouter)

const commentsRouter = require("./api/comments")
app.use("/comments", commentsRouter)

app.listen(port, () => {
  console.log(`listening at httP://localhost:${port}`)
})

module.exports = app
