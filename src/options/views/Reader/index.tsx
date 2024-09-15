import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const ReaderPage = memo(() => {
  return (
    <div className="">
      <Outlet />
    </div>
  )
})

export default ReaderPage
