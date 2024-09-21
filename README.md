# lolgg
Proyecto LOLgg


import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = 'RGAPI-172c0ced-da1d-45fc-bd67-dbe1657a3c3d'

function App () {
  const [buscarNick, setBuscarNick] = useState('')
  const [buscarTag, setBuscarTag] = useState('')
  const [url1, setUrl1] = useState('')
  const [datosAcc, setDatosAcc] = useState(null)

  const buscarPuuid = () => {
    if (buscarNick && buscarTag) {
      const nick = encodeURIComponent(buscarNick)
      const tag = encodeURIComponent(buscarTag)
      const API_NUCLEO = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nick}/${tag}?api_key=${API_KEY}`
      return setUrl1(API_NUCLEO)
    }
  }
  buscarPuuid()
  console.log(url1)

  function buscarPlayer (e) {
    buscarPuuid()

    console.log('hola')
  }

  useEffect(() => {
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        const puuid = data.puuid

        return fetch(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`)
      })
      .then((accResponse) => accResponse.json())
      .then((accData) => setDatosAcc(accData))
  }, [])

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
