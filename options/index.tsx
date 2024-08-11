import Button from 'antd/es/button'
import { useState } from "react"
import { ThemeProvider } from '~theme'

function OptionsPage() {
  const [data, setData] = useState("")

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default OptionsPage
