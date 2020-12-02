const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.get('/', (req, res) => {
  controller
    .listByMonthAllTurnos()
    .then((element) => response.success(req, res, element, 200))
    .catch((err) => response.error(req, res, err, 400, 'Peticion incorrecta'))
})

module.exports = router
