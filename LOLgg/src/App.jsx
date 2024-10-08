import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [playerData, setPlayerData] = useState({})

  function buscarPlayer (event) {
    console.log(buscarNick)
    console.log(buscarPlayer)
    const nicktag = buscarNick.split('#')
    const elNick = nicktag[0]
    const elTag = nicktag[1]

    axios.get('http://localhost:4000/infoAcc', { params: { nick: elNick, tag: elTag } })
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
