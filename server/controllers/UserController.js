const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('../helpers/jwt')
const axios = require('axios')
module.exports = class {
  static register(req, res, next) {
    let { name, email, password } = req.body
    console.log(name, email, password, 'ini dari register cont')

    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) {
          return User.create({
            name,
            email,
            password
          })
        } else {
          res.status(400).json({
            message: 'email already exist'
          })
        }
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    console.log('ini login controller ', email, password)

    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (!user) {
          res.status(404).json({
            message: 'user not found'
          })
        } else if (password === user.password) {
          let token = jwt.generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json(token)
        } else {
          res.status(400).json({
            message: 'email/password is invalid'
          })
        }
      })
      .catch(err => {
        console.log('langusung error', err)
        res.status(400).json(err)
      })
  }

  static randomme(req, res, next) {}
}
