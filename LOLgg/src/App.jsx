import { useState, useEffect } from 'react'
import './App.css'
import { useFetch } from './useFetch'

const API_KEY = 'RGAPI-dc2eefb1-e8da-47aa-a8f8-f0161d16f0f9'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [buscarTag, setBuscarTag] = useState('')
  const [url1, setUrl1] = useState('')
  const [url2, setUrl2] = useState('')

  console.log(buscarNick)
  console.log(buscarTag)

  const handleSearch = () => {
    if (buscarNick && buscarTag) {
      const API_NUCLEO = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${buscarNick}/${buscarTag}?api_key=${API_KEY}`
      setUrl1(API_NUCLEO)
    }
  }

  const { data, loading, error } = useFetch(url1)
  console.log(url1)

  useEffect(() => {
    if (data && data.puuid) {
      const puuId = data.puuid // Solo accede a puuId si data está disponible
      const API_LOL = `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuId}?api_key=${API_KEY}`
      if (url2 !== API_LOL) {
        setUrl2(API_LOL)
      }
    }
  }, [data])

  return (
    <>
      <h1>LOL.GG</h1>
      <h2>Ingrese su nick arriba y tag abajo de lol</h2>
      <input type='text' placeholder='nick = marinero' onChange={e => setBuscarNick(e.target.value)} />
      <input type='text' placeholder='tag = 7218' onChange={e => setBuscarTag(e.target.value)} />

      {/* Botón para realizar la búsqueda */}
      <button onClick={handleSearch}>Buscar Perfil</button>

      <div>
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
      </div>
    </>
  )
}

export default App
