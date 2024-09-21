import { useState } from 'react'
import './App.css'

function App () {
  const API_KEY = 'RGAPI-172c0ced-da1d-45fc-bd67-dbe1657a3c3d'
  const [buscarNick, setBuscarNick] = useState('')
  const [buscarTag, setBuscarTag] = useState('')
  const [playerData, setPlayerData] = useState({})

  const nick = encodeURIComponent(buscarNick)
  const tag = encodeURIComponent(buscarTag)

  function buscarPlayer (e) {
    const API_NUCLEO = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nick}/${tag}?api_key=${API_KEY}`

    fetch(API_NUCLEO)
      .then(response => response.json())
      .then(response => {
        const data = response
        setPlayerData(data)
        console.log(playerData)
      })
    console.log(playerData)
  }

  return (
    <>

      <img href='https://ibb.co/M8z5svw' src='https://i.ibb.co/M8z5svw/lgo.png' alt='lgo' border='0' />
      <h2 className='texth2'>Ingrese su nick y tag de lol</h2>
      <input type='text' placeholder='nick = marinero' onChange={e => setBuscarNick(e.target.value)} />
      <input type='text' placeholder='tag = 7218' onChange={e => setBuscarTag(e.target.value)} />
      <button onClick={e => buscarPlayer(e)}>buscar sumoner</button>
      <br /> <br />

    </>
  )
}

export default App
