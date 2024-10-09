const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

const API_KEY = 'RGAPI-59128a00-7c4b-4594-a826-507faca4164e'

app.get('/infoAcc', async (req, res) => {
  const playerReg = req.query.region
  const playerNick = req.query.nick
  const playerTag = req.query.tag
  const playerServer = req.query.server

  function getPlayerPUUID (playerNick, playerTag, playerReg) {
    return axios.get(`https://${playerReg}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerNick}/${playerTag}?api_key=${API_KEY}`)
      .then(response => {
        console.log(response.data)
        return response.data.puuid
      }).catch(err => err)
  }

  const PUUID = await getPlayerPUUID(playerNick, playerTag, playerReg)
  console.log('el puuid es:' + PUUID)
  const API_CALL = `https://${playerServer}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID}?api_key=${API_KEY}`

  const infoAcc = await axios.get(API_CALL)
    .then(response => response.data)
    .catch(err => err)
  console.log(infoAcc)
  res.json(infoAcc)
})

app.listen(4000, function () {
  console.log('server started on port 4000')
})
