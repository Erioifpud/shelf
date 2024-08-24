import { useState } from 'react'
import { EditContext } from './ctx'

interface Props {
  children: React.ReactNode
}

export function EditContextProvider(props: Props) {
  const [drawerVisible, setDrawerVisible] = useState(false)

  return (
    <EditContext.Provider value={{
      drawerVisible,
      setDrawerVisible
    }}>
      {props.children}
    </EditContext.Provider>
  )
}