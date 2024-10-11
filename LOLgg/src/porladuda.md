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