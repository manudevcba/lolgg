import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import { Button, TextField, Select, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

const API_KEY = 'RGAPI-4373516a-1af5-490d-afa7-ecef9aeb5341'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [playerData, setPlayerData] = useState({})
  const [buscarServer, setBuscarServer] = useState('br1+americas')
  const [playerRank, setPlayerRank] = useState({})
  const [playerMatch, setPlayerMatch] = useState([])
  const [playerHistory, setPlayerHistory] = useState([])

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

  // "https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/" iconos campeones xd

  const nickytag2 = buscarNick.split('#')
  const nick2 = nickytag2[0]

  async function buscarPlayer (event) {
    try {
      const nicktag = buscarNick.split('#')
      const [nick, tag] = nicktag
      const regsv = buscarServer.split('+')
      const sv = regsv[0]
      const reg = regsv[1]

      const responsePlayer = await axios.get('http://localhost:4000/infoAcc', {
        params: { nick, tag, server: sv, region: reg }
      })
      const playerDataTemp = responsePlayer.data
      setPlayerData(responsePlayer.data)

      const responseRank = await axios.get(`https://${sv}.api.riotgames.com/lol/league/v4/entries/by-summoner/${responsePlayer.data.id}?api_key=${API_KEY}`)
      setPlayerRank(responseRank.data)

      const responseMatch = await axios.get(`https://${reg}.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerDataTemp.puuid}/ids?api_key=${API_KEY}`)

      const playerMatchTemp = responseMatch.data
      setPlayerMatch(playerMatchTemp)

      const arrayMatch = []
      for (let i = 0; i < playerMatchTemp.length - 15; i++) {
        const matchData = await axios.get(`https://${reg}.api.riotgames.com/lol/match/v5/matches/${playerMatchTemp[i]}?api_key=${API_KEY}`)
        arrayMatch.push(matchData.data)
      }
      setPlayerHistory(arrayMatch)
    } catch (error) {
      console.log(error)
    }
  }
  console.log('playerData: ', playerData)
  console.log('buscarServer: ', buscarServer)
  console.log('playerRank: ', playerRank)
  console.log('playerMaych: ', playerMatch)
  console.log('playerHistory: ', playerHistory)
  console.log('nick: ', nick2)

  function imagenRank (rank) {
    if (rank === 'DIAMOND') {
      return <a href='https://imgur.com/5NfRZ8i'><img className='rank-imagen' src='https://i.imgur.com/5NfRZ8i.png' title='source: imgur.com' /></a>
    } else if (rank === 'IRON') {
      return <a href='https://imgur.com/TUDQs3o'><img className='rank-imagen' src='https://i.imgur.com/TUDQs3o.png' title='source: imgur.com' /></a>
    } else if (rank === 'BRONZE') {
      return <a href='https://imgur.com/gRYyXkx'><img className='rank-imagen' src='https://i.imgur.com/gRYyXkx.png' title='source: imgur.com' /></a>
    } else if (rank === 'SILVER') {
      return <a href='https://imgur.com/UEOK81G'><img className='rank-imagen' src='https://i.imgur.com/UEOK81G.png' title='source: imgur.com' /></a>
    } else if (rank === 'GOLD') {
      return <a href='https://imgur.com/vrTdXze'><img className='rank-imagen' src='https://i.imgur.com/vrTdXze.png' title='source: imgur.com' /></a>
    } else if (rank === 'PLATINUM') {
      return <a href='https://imgur.com/pvsqRfl'><img className='rank-imagen' src='https://i.imgur.com/pvsqRfl.png' title='source: imgur.com' /></a>
    } else if (rank === 'EMERALD') {
      return <a href='https://imgur.com/ZK1LeZQ'><img className='rank-imagen' src='https://i.imgur.com/ZK1LeZQ.png' title='source: imgur.com' /></a>
    } else if (rank === 'MASTER') {
      return <a href='https://imgur.com/m55levP'><img className='rank-imagen' src='https://i.imgur.com/m55levP.png' title='source: imgur.com' /></a>
    } else if (rank === 'GRANDMASTER') {
      return <a href='https://imgur.com/AObqDXT'><img className='rank-imagen' src='https://i.imgur.com/AObqDXT.png' title='source: imgur.com' /></a>
    } else if (rank === 'CHALLENGER') {
      return <a href='https://imgur.com/N07nf04'><img className='rank-imagen' src='https://i.imgur.com/N07nf04.png' title='source: imgur.com' /></a>
    } else {
      return <a href=''>UNRANKED O ERROR ! :D</a>
    }
  }

  return (
    <div>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>

            <Box display='flex' alignItems='center' mr={2}>
              <img
                src='https://i.imgur.com/TUhrHC3.png'
                alt='logo'
                style={{ width: '130px', height: 'auto', borderRadius: '8px' }}
              />
            </Box>

            <Box display='flex' justifyContent='center' flex='1'>
              <img
                src='https://i.imgur.com/NOEKnDI.png'
                alt='logo'
                style={{ width: '180px', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          </Box>

          <Box className='texth2' display='flex' justifyContent='flex-end' flexGrow={1}>

            <Link href='https://github.com/manudevcba' color='inherit' underline='none' mx={2} target='_blank' rel='noreferrer'>
              Contacto
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <div className='divBuscador'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          gap={2}
          padding={2}
          bgcolor='background.paper'
          borderRadius={2}
          boxShadow={3}
          sx={{ width: '50%', margin: 'auto' }} // Asegúrate de que solo ocupe la mitad
        >
          <TextField
            variant='outlined'
            label='Nick de invocador'
            placeholder='ejemplo: marinero#7218'
            onChange={e => setBuscarNick(e.target.value)}
            size='small'
            InputLabelProps={{
              style: { fontWeight: 'bold' } // Establece el estilo en negrita
            }}

          />

          <Select
            defaultValue=''
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
      </div>
      <p className='texth2'>
        Summoner Name: {buscarNick} <br />
        Summoner LVL: {playerData.summonerLevel}
      </p>

      <p className='texth2'>
        {playerRank.length > 0
          ? (
            <>
              <img className='icono' src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/profileicon/${playerData.profileIconId}.png`} alt='' />
              {imagenRank(playerRank[0].tier)}
              <br /> <br />

              Rank SoloQ: {playerRank[0].tier} {playerRank[0].rank} {playerRank[0].leaguePoints} Lps <br />
              Wins/Losses: {playerRank[0].wins} / {playerRank[0].losses} winrate: {Math.round((playerRank[0].wins / (playerRank[0].wins + playerRank[0].losses)) * 100)}% <br />

            </>
            )
          : (
              'No hay datos, por favor ingresa tu cuenta! :D'
            )}
      </p>
      {playerHistory.length
        ? (
          <div className='history-container'>
            <div className='texth2'>
              Match History!:<br />
              {playerHistory.map((historyData, index) => {
                const participant = historyData.info.participants.find(participant => participant.riotIdGameName === nick2)

                const matchResultClass = participant ? (participant.win ? 'win' : 'lose') : 'lose'

                return (
                  <React.Fragment key={index}>
                    <h3>GAME {index + 1}</h3>
                    <div className={matchResultClass}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          {historyData.info.participants.slice(0, 5).map((data, participantsIndex) => (
                            <p key={participantsIndex}>
                              <img className='champ-imagen' src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${data.championName}.png`} /> {data.riotIdGameName}, KDA: {data.kills} / {data.deaths} / {data.assists} /  ({(data.challenges.kda).toFixed(1)})
                            </p>
                          ))}
                        </div>
                        <div>
                          {historyData.info.participants.slice(5, 10).map((data, participantsIndex) => (
                            <p key={participantsIndex + 5}>
                              <img className='champ-imagen' src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${data.championName}.png`} /> {data.riotIdGameName}, KDA: {data.kills} / {data.deaths} / {data.assists} / ({(data.challenges.kda).toFixed(1)})
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          )
        : <p className='texth2'> No hay datos en el historial</p>}

    </div>
  )
}

export default App
