const express = require('express')
const app = express()
const port = process.env.PORT || 3000
/* const cors = require('cors') */
const router = require('./network/routes')
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded========
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json=====================
app.use(bodyParser.json())
/* app.use(cors()) */
app.use(express.static(__dirname + '/public'))
router(app)

app.listen(port, () =>
  console.log(`Esta aplicacion esta escuchando! http://localhost:${port}`)
)
