const express = "express"
const multer = require("multer")
const bodyParser = require("body-parser")

const Pool = require("pg").Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Bushwick",
  password: "''''",
  port: 5432,
})

const commentPost = async (req, res, next) => {
  const { user_id, post_id, content } = req.body

  try {
    await pool.query(
      "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
      [user_id, post_id, content],
      (err, result) => {
        if (!result) {
          console.log(err)
          res.status(500).json({ msg: err })
          next()
        }

        res.status(200).json(result.rows)
      }
    )
  } catch (err) {}
}

const getComments = async (req, res, next) => {
  try {
    await pool.query("SELECT * FROM comments", (err, result) => {
      if (!result) {
        console.log(err)
        res.status(500).json({ msg: err })
        next()
      }
      res.status(200).json(result.rows)
    })
  } catch (err) {
    console.log(err)
  }
}

exports.commentPost = commentPost
exports.getComments = getComments
