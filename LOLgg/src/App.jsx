import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = 'RGAPI-9f80c33e-8c6d-4f2c-9449-98305b33f19c'

function App () {
  const [buscarPlayer, setBuscarPlayer] = useState('')

  const buscarUnPlayer = (e) => {
    const API_NUCLEO = 'la2.api.riotgames.com'
  }

  return (
    <>

      <h1>LOL.GG</h1>
      <h2>Ingrese su nick+id de lol uwu</h2>
      <input type='text' placeholder='marinero#7218' onChange={e => setBuscarPlayer(e.target.value)} />
      <button onClick={e => buscarUnPlayer(e)}>buscar perfil</button>

    </>
  )
}

export default App
