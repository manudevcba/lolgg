import { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_KEY = 'RGAPI-4fd9bbe1-01d7-4fca-85dc-3ed8348c7637'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [playerData, setPlayerData] = useState({})
  const [buscarServer, setBuscarServer] = useState('br1+americas')
  const [playerRank, setPlayerRank] = useState({})

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

  async function buscarPlayer (event) {
    try {
      const nicktag = buscarNick.split('#')
      const elNick = nicktag[0]
      const elTag = nicktag[1]
      const regsv = buscarServer.split('+')
      const sv = regsv[0]
      const reg = regsv[1]

      const responsePlayer = await axios.get('http://localhost:4000/infoAcc', {
        params: { nick: elNick, tag: elTag, server: sv, region: reg }
      })
      setPlayerData(responsePlayer.data)

      const responseRank = await axios.get(`https://${sv}.api.riotgames.com/lol/league/v4/entries/by-summoner/${responsePlayer.data.id}?api_key=${API_KEY}`)
      setPlayerRank(responseRank.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(playerData)
  console.log(buscarServer)
  console.log(playerRank)

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
      <p className='texth2'>
        {playerRank.length > 0
          ? (
            <>
              Rank SoloQ: {playerRank[0].tier} {playerRank[0].rank} {playerRank[0].leaguePoints} Lps <br />
              Wins/Losses: {playerRank[0].wins} / {playerRank[0].losses} winrate: {Math.round((playerRank[0].wins / (playerRank[0].wins + playerRank[0].losses)) * 100)}%
            </>
            )
          : (
              'No hay datos'
            )}
      </p>

    </>
  )
}

export default App
