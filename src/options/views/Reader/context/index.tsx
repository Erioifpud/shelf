import { useState } from 'react'
import { ReaderContext } from './ctx'

interface Props {
  children: React.ReactNode
}

export function ReaderContextProvider(props: Props) {
  const [drawerVisible, setDrawerVisible] = useState(false)

  return (
    <ReaderContext.Provider value={{
      drawerVisible,
      setDrawerVisible
    }}>
      {props.children}
    </ReaderContext.Provider>
  )
}