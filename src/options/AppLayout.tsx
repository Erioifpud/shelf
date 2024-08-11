import { ThemeProvider } from '~theme'
import { Provider } from "react-redux"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "~store"
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import Layout from 'antd/es/layout'
import Menu from 'antd/es/menu'
import { useCallback, memo } from 'react'
import { Content, Header } from 'antd/es/layout/layout'
import '../global.css'
import { EditOutlined, HomeOutlined } from '@ant-design/icons'

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
        <PersistGate loading={null} persistor={persistor}>
          <Layout style={{ height: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
              <div className="demo-logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['/']}
                selectedKeys={[match?.pathname]}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
                onClick={to}
              />
            </Header>
            <Content style={{ padding: '0 48px' }} className="h-full">
              <div className="relative h-full overflow-hidden">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
})

export default AppLayout
