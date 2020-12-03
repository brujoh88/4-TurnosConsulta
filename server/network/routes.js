const express = require('express')

const login = require('../components/login/network')
const queryListTurnos = require('../components/consultaTurno/network')

const routes = (server) => {
  server.use('/login', login)
  server.use('/getDate', queryListTurnos)
}

module.exports = routes
