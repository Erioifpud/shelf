import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import PageDrawer from './components/PageDrawer';

const ReaderPage = memo(() => {


  return (
    <div className="relative h-full overflow-hidden flex flex-col">
      <div className="flex-shrink-0 h-14 flex items-center px-4 border-b border-solid border-gray-300">
        <PageDrawer />
      </div>
      <div className="relative flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
})

export default ReaderPage
