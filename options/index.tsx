import { ThemeProvider } from '~theme'
import { Provider } from "react-redux"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "~store"
import { RouterProvider } from 'react-router-dom'
import { router } from './views/router'

function OptionsPage() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default OptionsPage
