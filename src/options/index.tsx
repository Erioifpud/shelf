import { ThemeProvider } from '~theme'
import { Provider } from "react-redux"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "~store"
import { RouterProvider } from 'react-router-dom'
import { router } from './views/router'
import Layout from 'antd/es/layout'
import Sider from 'antd/es/layout/Sider'
import Menu, { type MenuProps } from 'antd/es/menu'
import { useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import '../global.css'

function OptionsPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="flex h-full">
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  // {
                  //   key: '1',
                  //   icon: <UserOutlined />,
                  //   label: 'nav 1',
                  // },
                  // {
                  //   key: '2',
                  //   icon: <VideoCameraOutlined />,
                  //   label: 'nav 2',
                  // },
                  // {
                  //   key: '3',
                  //   icon: <UploadOutlined />,
                  //   label: 'nav 3',
                  // },
                ]}
              />
            </Sider>
          </div>
          {/* <RouterProvider router={router} /> */}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default OptionsPage
