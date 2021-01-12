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

const getPosts = async (req, res, next) => {
  try {
    await pool.query(
      "SELECT * FROM posts ORDER BY date DESC",
      (err, result) => {
        if (!result["rows"]) {
          res.status(500).json({ msg: err }, "line 16")
        }
        res.status(200).json(result.rows)
      }
    )
  } catch (error) {
    console.log("line 21")
  }
}

const createPost = async (req, res, next) => {
  const now = new Date()
  const { userId, content, photoUri } = req.body

  console.log(content)

  try {
    await pool.query(
      "INSERT INTO posts (user_id, content, photo, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, content, photoUri, now],
      (err, result) => {
        if (!result) {
          newError = "something went wrong at line 36"
          res.status(500).json({ msg: newError, err, result })
          next()
        }
        res.status(201).json(result.rows)
      }
    )
  } catch (err) {
    console.log("posts controller line 19")
  }
}

const getPostbyUID = async (req, res, next) => {
  const user_id = req.params.uid
  try {
    await pool.query(
      `SELECT * FROM posts WHERE user_id = $1 ORDER BY date DESC`,
      [user_id],
      (err, result) => {
        console.log(result)
        if (!result) {
          res.status(500).json({ msg: "line 55 ish" })
          next()
        }
        res.status(200).json(result.rows)
      }
    )
  } catch (error) {
    console.log("67")
  }
}

exports.createPost = createPost
exports.getPosts = getPosts
exports.getPostbyUID = getPostbyUID
