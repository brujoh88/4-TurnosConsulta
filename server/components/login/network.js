const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')

router.post('/', (req, res) => {
  controller
    .getUserByLegajo(req.body.legajo)
    .then((element) => response.success(req, res, element, 200))
    .catch((err) => response.error(req, res, err, 400, 'Peticion incorrecta'))
})

module.exports = router
