import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [buscarTag, setBuscarTag] = useState('')
  const [playerData, setPlayerData] = useState({})

  function buscarPlayer (event) {
    console.log(buscarNick)
    console.log(buscarPlayer)
    axios.get('http://localhost:4000/infoAcc', { params: { nick: buscarNick, tag: buscarTag } })
      .then(function (response) {
        setPlayerData(response.data)
      }).catch(function (error) {
        console.log(error)
      })
  }

  console.log(playerData)

  return (
    <>

      <img href='https://ibb.co/M8z5svw' src='https://i.ibb.co/M8z5svw/lgo.png' alt='lgo' border='0' />
      <h2 className='texth2'>Ingrese su nick y tag de lol separado con #</h2>
      <input type='text' placeholder='nick = marinero#7218' onChange={e => setBuscarNick(e.target.value)} />
      <input type='text' placeholder='tag = 7218' onChange={e => setBuscarTag(e.target.value)} />
      <button onClick={buscarPlayer}>buscar sumoner</button>
      <p className='texth2'>
        Summoner Name: {buscarNick}#{buscarTag}  <br />
        Summoner LVL: {playerData.summonerLevel}
      </p>

      <img width='100' height='100' src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/profileicon/${playerData.profileIconId}.png`} alt='' />

    </>
  )
}

export default App

app.get('/ligaAcc', async (req, res) => {
  const playerID = req.query.id
  const playerServer = req.query.server

  const RANK_CALL = `https://${playerServer}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerID}?api_key=${API_KEY}`

  const ligaAcc = await axios.get(RANK_CALL)
    .then(response => response.data)
    .catch(err => err)
  console.log(ligaAcc)
  res.json(ligaAcc)
})

return response.data.id
})
.then(function (playerID) {
  return axios.get('http://localhost:4000/ligaAcc', { params: { server: sv, id: playerID.id } })
})
.then(function (response) {
  setRankInfo(response.data)
})
--------------------------------------------------

const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

const API_KEY = 'RGAPI-5072a9c7-0d25-463d-8195-beb4141ce33d'

app.get('/infoAcc', async (req, res) => {
  const playerReg = req.query.region
  const playerNick = req.query.nick
  const playerTag = req.query.tag
  const playerServer = req.query.server

  function getPlayerPUUID (playerNick, playerTag, playerReg) {
    // https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/marinero/7218?api_key=RGAPI-93dc91de-25d0-4e9d-9eb8-42005a76d343
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

import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [playerData, setPlayerData] = useState({})
  const [buscarServer, setBuscarServer] = useState('')

  const servers = {
    brasil: 'br1+americas',
    europan: 'eun1+europe',
    europaw: 'euw1+europe',
    japon: 'jp1+asia',
    korea: 'kr+asia',
    lan: 'la1+americas',
    las: 'la2+americas',
    na: 'na1+americas',
    oceania: 'oc1+sea'
  }

  function buscarPlayer (event) {
    console.log(buscarNick)
    console.log(buscarPlayer)
    const nicktag = buscarNick.split('#')
    const elNick = nicktag[0]
    const elTag = nicktag[1]
    const regsv = buscarServer.split('+')
    const sv = regsv[0]
    const reg = regsv[1]

    axios.get('http://localhost:4000/infoAcc', { params: { nick: elNick, tag: elTag, server: sv, region: reg } })
      .then(function (response) {
        setPlayerData(response.data)
      }).catch(function (error) {
        console.log(error)
      })
  }

  console.log(playerData)
  console.log(buscarServer)

  return (
    <>

      <img href='https://ibb.co/M8z5svw' src='https://i.ibb.co/M8z5svw/lgo.png' alt='lgo' border='0' />
      <h2 className='texth2'>Ingrese su nick y tag de lol separado con #</h2>
      <input type='text' placeholder='ejemplo: marinero#7218' onChange={e => setBuscarNick(e.target.value)} />
      <select name='' id='' onChange={e => setBuscarServer(e.target.value)}>
        <option value={servers.brasil}>BR</option>
        <option value={servers.europan}>EUN</option>
        <option value={servers.europaw}>EUW</option>
        <option value={servers.japon}>JP</option>
        <option value={servers.korea}>KR</option>
        <option value={servers.lan}>LAN</option>
        <option value={servers.las}>LAS</option>
        <option value={servers.na}>NA</option>
        <option value={servers.oceania}>OC</option>

      </select>
      <button onClick={buscarPlayer}>buscar sumoner</button>
      <p className='texth2'>
        Summoner Name: {buscarNick} <br />
        Summoner LVL: {playerData.summonerLevel}
      </p>

      <img width='100' height='100' src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/profileicon/${playerData.profileIconId}.png`} alt='' />

    </>
  )
}

export default App

axios.get(`https://${sv}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerData.id}?api_key=${API_KEY}`)
      .then((value) =>
        console.log(value))

const matchDataArray = []
for (let i = 0; i < playerMatch.length; i++) {
        const matchData = await axios.get(`https://${reg}.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerMatch[i]}?api_key=${API_KEY}`)
          .then(response => response.data)
          .catch(err => err)
        matchDataArray.push(matchData)
      }