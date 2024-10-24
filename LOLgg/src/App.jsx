import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_KEY = 'RGAPI-340321fd-b92b-40fd-902d-0ca2a003c78e'

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
      <button onClick={buscarPlayer}>buscar summoner</button>
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
                // Busca el participante que coincide con nick2
                const participant = historyData.info.participants.find(participant => participant.riotIdGameName === nick2)
                // Si existe el participante, comprobamos si ganó o perdió
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
