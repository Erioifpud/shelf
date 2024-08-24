import { ThemeProvider } from '~theme'
import { Provider } from "react-redux"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "~store"
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import Layout from 'antd/es/layout'
import { useCallback, memo } from 'react'
import { Content } from 'antd/es/layout/layout'
import '../global.css'
import { EditOutlined, HomeOutlined } from '@ant-design/icons'
import { EditContextProvider } from './views/Edit/context'

const items = [
  { key: '/', icon: <HomeOutlined />, label: '图书馆' },
  { key: '/edit', icon: <EditOutlined />, label: '站点编辑' },
]

const AppLayout = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()
  const match = useMatch('/*');

  const to = useCallback((item) => {
    navigate(item.key, { replace: true })
  }, [navigate])

  return (
    <ThemeProvider>
      <Provider store={store}>
        <EditContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Layout style={{ height: '100vh' }}>
              <Content className="h-full">
                <div className="relative h-full overflow-hidden">
                  <Outlet />
                </div>
              </Content>
            </Layout>
          </PersistGate>
        </EditContextProvider>
      </Provider>
    </ThemeProvider>
  )
})

export default AppLayout
