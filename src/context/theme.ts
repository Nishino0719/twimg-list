import { createContext } from 'react'

export const lightModeContext = createContext(
  {} as {
    lightMode: boolean
    setLightMode: React.Dispatch<React.SetStateAction<boolean>>
  }
)
