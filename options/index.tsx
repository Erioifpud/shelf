import Button from 'antd/es/button'
import { ThemeProvider } from '~theme'
import { Provider } from "react-redux"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "~store"

function OptionsPage() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 16
            }}>
            <h1>
              Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
            </h1>
            <Button type="primary">Fascinating</Button>
          </div>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default OptionsPage
