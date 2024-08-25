import { memo, useCallback, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '~components/ui/tabs';
import { useCurrentEditPage } from '../../hooks/useSite';
import { Outlet, useNavigate } from 'react-router-dom';

const tabs = [
  { label: '通用设置', page: 'common' },
  { label: '页面设置', page: 'page' },
  { label: '列表页规则', page: 'list' },
  { label: '详情页规则', page: 'detail' },
  { label: '预览页规则', page: 'preview' },
  { label: '搜索页规则', page: 'search' },
  { label: '标签页规则', page: 'tag' },
]

const SiteEdit = memo(() => {
  const navigate = useNavigate()
  const pageType = useCurrentEditPage()

  const handleNavigate = useCallback((path: string) => {
    navigate(`./${path}`, {
      relative: 'path'
    })
  }, [navigate])

  useEffect(() => {
    if (!pageType) {
      // 如果满足条件，则导航到/common子路径
      navigate('./common', { replace: true });
    }
  }, [pageType, navigate])

  return (
    <div className="relative h-full overflow-hidden flex flex-col">
      <Tabs
        defaultValue="common"
        className="w-full flex-shrink-0"
        value={pageType}
        onValueChange={handleNavigate}
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.page} value={tab.page}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
})

export default SiteEdit
