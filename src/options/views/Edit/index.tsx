import { UnorderedListOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import Drawer from 'antd/es/drawer';
import { Header } from 'antd/es/layout/layout';
import { memo, useContext } from 'react';
import { EditContext } from './context/ctx';

const EditPage = memo(() => {
  const { drawerVisible, setDrawerVisible } = useContext(EditContext);

  return (
    <div className="relative h-full overflow-hidden flex flex-col">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Button type="primary" icon={<UnorderedListOutlined />} onClick={() => {setDrawerVisible(true)}} />
      </Header>
      <div className="h-full">EditPage</div>
      <Drawer title="配置菜单" onClose={() => setDrawerVisible(false)} open={drawerVisible} placement="left">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
});

export default EditPage;
