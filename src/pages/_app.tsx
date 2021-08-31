import '../styles/globals.css'
import '../lib/Twitter'
import { lightModeContext } from '../context/theme'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [lightMode, setLightMode] = useState(true)

  return (
    <lightModeContext.Provider value={{ lightMode, setLightMode }}>
      <Component {...pageProps} />
    </lightModeContext.Provider>
  )
}

export default MyApp
