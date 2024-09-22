const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

const API_KEY = 'RGAPI-5c7a7140-e92a-4a95-be38-1c2d9e5eff9e'

app.listen(4000, function () {
  console.log('server started on port 4000')
})
