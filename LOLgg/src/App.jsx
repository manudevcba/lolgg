import { useState, useEffect } from 'react'
import './App.css'
import { useFetch } from './useFetch'

const API_KEY = 'RGAPI-dc2eefb1-e8da-47aa-a8f8-f0161d16f0f9'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [buscarTag, setBuscarTag] = useState('')
  const [url, setUrl] = useState('')

  console.log(buscarNick)
  console.log(buscarTag)

  const { data, loading, error } = useFetch(url)

  const buscarPlayer = (event) => {
    event.preventDefault()
    if (buscarNick && buscarTag) {
      const API_NUCLEO = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${buscarNick}/${buscarTag}?api_key=${API_KEY}`
      setUrl(API_NUCLEO)
    }
  }

  return (
    <>

      <h1>LOL.GG</h1>
      <h2>Ingrese su nick arriba y tag abajo de lol </h2>
      <input type='text' placeholder='nick = marinero' onChange={e => setBuscarNick(e.target.value)} />
      <input type='text' placeholder='tag = 7218' onChange={e => setBuscarTag(e.target.value)} />
      <button onClick={e => buscarPlayer(e)}>buscar perfil</button>

    </>
  )
}

export default App
