const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

const API_KEY = 'RGAPI-3d83766d-4304-4d64-b881-1a7fd06491c5'

function getPlayerPUUID (playerNick, playerTag) {
  return axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerNick}/${playerTag}?api_key=${API_KEY}`)
    .then(response => {
      console.log(response.data)
      return response.data.puuid
    }).catch(err => err)
}

app.get('/infoAcc', async (req, res) => {
  const playerNick = 'marinero'
  const playerTag = '7218'

  const PUUID = await getPlayerPUUID(playerNick, playerTag)
  const API_CALL = `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID}?api_key=${API_KEY}`

  const infoAcc = await axios.get(API_CALL)
    .then(response => response.data)
    .catch(err => err)
  console.log(infoAcc)
  res.json(infoAcc)
})

app.listen(4000, function () {
  console.log('server started on port 4000')
})
