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

const likePost = async (req, res, next) => {
  const { user_id, post_id } = req.body
  try {
    await pool.query(
      "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *",
      [user_id, post_id],
      (err, result) => {
        if (!result) {
          console.log(err)
          res.status(500).json({ msg: err })
          next()
        }
        res.status(201).json(result.rows)
      }
    )
  } catch (error) {
    console.log(error, "line 18")
  }
}

const unLikePost = async (req, res, next) => {
  const { user_id, post_id } = req.body
  try {
    await pool.query(
      "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
      [user_id, post_id],
      (err, result) => {
        if (!result) {
          console.log(err)
          res.status(500).json({ msg: err })
          next()
        }
        res.status(201).json(result.rows)
      }
    )
  } catch (error) {
    console.log(error)
  }
}

const getLikes = async (req, res, next) => {
  try {
    await pool.query("SELECT * FROM likes", (err, result) => {
      if (!result) {
        console.log(err)
        next()
      }
      res.status(200).json(result.rows)
    })
  } catch (error) {
    console.log(error)
  }
}

exports.likePost = likePost
exports.getLikes = getLikes
exports.unLikePost = unLikePost
