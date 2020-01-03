//required files
const express = require('express')
const router = express.Router();

//bcryptjs
const bcrypt = require('bcryptjs')

//User modal of mongoDB
const User = require('../models/User')


//Post request for login
router.post('/', (req, res) => {
  //email and password
  const email = req.body.email
  const password = req.body.password

  //find user exist or not
  User.findOne({ email })
    .then(user => {
      //if user does not exist than return status 400
      if (!user) return res.status(400).json({ msg: "User does not exist" })

      //if user exist than compare password
      //password comes from the user
      //user.password comes from the database
      bcrypt.compare(req.body.password, user.password, function (err, results) {
        if (err) {
          throw new Error(err)
        }
        if (results) {
          return res.status(200).json({ msg: "Login success" })
        } else {
          return res.status(401).json({ msg: "Invalid credencial" })
        }
      })
    })

})

module.exports = router
