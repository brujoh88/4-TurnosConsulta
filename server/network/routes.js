const express = require('express')

const login = require('../components/login/network')

const routes = (server) => {
  server.use('/login', login)
}

module.exports = routes
