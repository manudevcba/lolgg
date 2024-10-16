import { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_KEY = 'RGAPI-ca8762a4-7cee-48eb-bec2-7a0c62c9244c'

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
      const [nick, tag] = nicktag
      const regsv = buscarServer.split('+')
      const sv = regsv[0]
      const reg = regsv[1]

      const responsePlayer = await axios.get('http://localhost:4000/infoAcc', {
        params: { nick, tag, server: sv, region: reg }
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

  function imagenRank (rank) {

      if (rank === "DIAMOND"){
        return <a href="https://imgur.com/5NfRZ8i"><img className='rank-imagen' src="https://i.imgur.com/5NfRZ8i.png" title="source: imgur.com" /></a>
      }
      else if (rank === "IRON"){
        return <a href="https://imgur.com/TUDQs3o"><img className="rank-imagen"src="https://i.imgur.com/TUDQs3o.png" title="source: imgur.com" /></a>  
      }
      else if (rank === "BRONZE") {
        return <a href="https://imgur.com/gRYyXkx"><img className="rank-imagen"src="https://i.imgur.com/gRYyXkx.png" title="source: imgur.com" /></a>
      }
      else if (rank === "SILVER"){
        return <a href="https://imgur.com/UEOK81G"><img className="rank-imagen" src="https://i.imgur.com/UEOK81G.png" title="source: imgur.com" /></a>
      }
      else if (rank === "GOLD"){
        return <a href="https://imgur.com/vrTdXze"><img className="rank-imagen" src="https://i.imgur.com/vrTdXze.png" title="source: imgur.com" /></a>
      }
      else if (rank === "PLATINUM") {
        return <a href="https://imgur.com/pvsqRfl"><img className="rank-imagen" src="https://i.imgur.com/pvsqRfl.png" title="source: imgur.com" /></a>
      }
      else if (rank === "ESMERALD") {
        return <a href="https://imgur.com/ZK1LeZQ"><img className="rank-imagen" src="https://i.imgur.com/ZK1LeZQ.png" title="source: imgur.com" /></a>
      }
      else if (rank === "MASTER"){
        return <a href="https://imgur.com/m55levP"><img className="rank-imagen" src="https://i.imgur.com/m55levP.png" title="source: imgur.com" /></a>
      }
      else if (rank === "GRANDMASTER") {
        return <a href="https://imgur.com/AObqDXT"><img className="rank-imagen" src="https://i.imgur.com/AObqDXT.png" title="source: imgur.com" /></a>
      }
      else if (rank === "CHALLENGER") {
        return <a href="https://imgur.com/N07nf04"><img className="rank-imagen" src="https://i.imgur.com/N07nf04.png" title="source: imgur.com" /></a>
      }
      else {
        return <a href="">UNRANKED O ERROR ! :D</a>
      }
  }

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

      <img className='icono' src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/profileicon/${playerData.profileIconId}.png`} alt='' />
      {imagenRank(playerRank[0].tier)}
      <p className='texth2'>
        {playerRank.length > 0
          ? (
            <>
              Rank SoloQ: {playerRank[0].tier} {playerRank[0].rank} {playerRank[0].leaguePoints} Lps <br />
              Wins/Losses: {playerRank[0].wins} / {playerRank[0].losses} winrate: {Math.round((playerRank[0].wins / (playerRank[0].wins + playerRank[0].losses)) * 100)}% <br />              
              
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
