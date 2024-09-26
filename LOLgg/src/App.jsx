import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [buscarTag, setBuscarTag] = useState('')
  const [playerData, setPlayerData] = useState({})

  function buscarPlayer (event) {
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
      <h2 className='texth2'>Ingrese su nick y tag de lol</h2>
      <input type='text' placeholder='nick = marinero' onChange={e => setBuscarNick(e.target.value)} />
      <input type='text' placeholder='tag = 7218' onChange={e => setBuscarTag(e.target.value)} />
      <button onClick={buscarPlayer}>buscar sumoner</button>
      <br /> <br />

    </>
  )
}

export default App
