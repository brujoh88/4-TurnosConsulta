const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')
//
const cors = require('cors')
//
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.post('/', cors(corsOptions), (req, res) => {
  controller
    .getUserByLegajo(req.body.legajo, req.body.password)
    .then((element) => response.success(req, res, element, 200))
    .catch((err) => response.error(req, res, err, 400, 'Peticion incorrecta'))
})

module.exports = router
