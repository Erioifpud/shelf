import { Provider } from "react-redux"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "~store"
import { Outlet } from 'react-router-dom'
import { memo } from 'react'
import '../global.css'
import { EditContextProvider } from './views/Edit/context'
import { ReaderContextProvider } from './views/Reader/context'

const AppLayout = memo(() => {
  // const location = useLocation()
  // const navigate = useNavigate()
  // const match = useMatch('/*');

  // const to = useCallback((item) => {
  //   navigate(item.key, { replace: true })
  // }, [navigate])

  return (
    <Provider store={store}>
      <EditContextProvider>
        <ReaderContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            <div className="relative h-full overflow-hidden">
              <Outlet />
            </div>
          </PersistGate>
        </ReaderContextProvider>
      </EditContextProvider>
    </Provider>
  )
})

export default AppLayout
