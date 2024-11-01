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


{playerHistory.length !== 0
        ? (
          <div className='texth2'> Hay datos <br />
            {playerHistory.map((historyData, index) =>
              <>
                <h3>GAME {index + 1} </h3>
                <div>{historyData.info.participants.map((data, participantsIndex) =>
                  <p> player {participantsIndex + 1}: {data.riotIdGameName}, KDA: {data.kills} / {data.deaths} / {data.assists} / {data.championName} ({(data.challenges.kda).toFixed(1)}) </p>

                )}
                </div>

              </>)}

          </div>
          )
        : <p className='texth2'> No hay datos</p>}
    </div>

    {playerHistory.length
        ? (
          <div className='texth2'> Hay datos <br />
            {playerHistory.map((historyData, index) => (
              <React.Fragment key={index}>
                <h3>GAME {index + 1}</h3>
                <div className={historyData.info.participants.some(participant => participant.riotIdGameName === nick2)
                  ? historyData.info.participants.some(participant => participant.riotIdGameName === nick2 && participant.win)
                    ? 'win'
                    : 'lose'
                  : 'lose'}
                >
                  {historyData.info.participants.map((data, participantsIndex) => (
                    <p key={participantsIndex}>
                      player {participantsIndex + 1}: {data.riotIdGameName}, KDA: {data.kills} / {data.deaths} / {data.assists} / {data.championName} ({(data.challenges.kda).toFixed(1)})
                    </p>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          )
        : <p className='texth2'> No hay datos en el historial</p>}

    {playerHistory.length
        ? (
          <div className='texth2'>
            <br />
            {playerHistory.map((historyData, index) => (
              <React.Fragment key={index}>
                <h3>GAME {index + 1}</h3>
                <div className={historyData.info.participants.some(participant => participant.riotIdGameName === nick2)
                  ? historyData.info.participants.some(participant => participant.riotIdGameName === nick2 && participant.win)
                    ? 'win'
                    : 'lose'
                  : 'lose'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Columna del equipo 1 (jugadores 1-5) */}
                    <div>
                      {historyData.info.participants.slice(0, 5).map((data, participantsIndex) => (
                        <p key={participantsIndex}>
                          player {participantsIndex + 1}: {data.riotIdGameName}, KDA: {data.kills} / {data.deaths} / {data.assists} / {data.championName} ({(data.challenges.kda).toFixed(1)})
                        </p>
                      ))}
                    </div>

                    {/* Columna del equipo 2 (jugadores 6-10) */}
                    <div>
                      {historyData.info.participants.slice(5, 10).map((data, participantsIndex) => (
                        <p key={participantsIndex + 5}>
                          player {participantsIndex + 6}: {data.riotIdGameName}, KDA: {data.kills} / {data.deaths} / {data.assists} / {data.championName} ({(data.challenges.kda).toFixed(1)})
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          )
        : <p className='texth2'> No hay datos en el historial</p>}

        <img href='https://imgur.com/TUhrHC3' src='https://i.imgur.com/TUhrHC3.png' alt='logo' />
      <header> </header>

      <br /><br />

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

<Box>

        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          gap={2}
          padding={2}
          bgcolor='background.paper'
          borderRadius={2}
          boxShadow={3}
        >
          <TextField
            variant='outlined'
            label='Nick de invocador'
            placeholder='ejemplo: marinero#7218'
            onChange={e => setBuscarNick(e.target.value)}
            size='small'
          />

          <Select
            defaultValue='' // Valor predeterminado
            onChange={(e) => setBuscarServer(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120 }}
            size='small'
          >
            <MenuItem value='' disabled>
              Selecciona un servidor
            </MenuItem>
            <MenuItem value={servers.brasil}>BR</MenuItem>
            <MenuItem value={servers.europan}>EUN</MenuItem>
            <MenuItem value={servers.europaw}>EUW</MenuItem>
            <MenuItem value={servers.japon}>JP</MenuItem>
            <MenuItem value={servers.korea}>KR</MenuItem>
            <MenuItem value={servers.lan}>LAN</MenuItem>
            <MenuItem value={servers.las}>LAS</MenuItem>
            <MenuItem value={servers.na}>NA</MenuItem>
            <MenuItem value={servers.oceania}>OC</MenuItem>
          </Select>

          <Button variant='contained' size='medium' onClick={buscarPlayer}>
            Buscar Summoner
          </Button>
        </Box>
      </Box> god