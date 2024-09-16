import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import ActionMenu from '~components/ActionMenu';
import { Button } from '~components/ui/button';
import type { RootState } from '~store';
import { createSite, deleteSite } from '~store/site/site-slice';
import { cn } from '~utils/index';
import { useCurrentSiteId } from '../../hooks';
import { toast } from '~hooks/use-toast';

const SiteSelect = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentSiteId = useCurrentSiteId()
  const sites = useSelector((state: RootState) => state.site.sites)

  const handleDelete = useCallback((id: string) => {
    // TODO: 确认弹窗
    if (currentSiteId === id) {
      navigate('/edit', { replace: true })
    }
    dispatch(deleteSite(id))
    }, [dispatch, currentSiteId, navigate])

  const handleSelectSite = useCallback((id: string) => {
    navigate(`/edit/${id}`)
  }, [navigate])

  const handleCreate = useCallback(() => {
    dispatch(createSite())
  }, [dispatch])

  const handleEnter = useCallback((id: string) => {
    const site = sites.find(s => s.id === id)
    if (!site) {
      return
    }
    const pages = site.pages
    if (!pages.length) {
      toast({
        description: '请先添加页面',
        variant: 'destructive',
      })
      return
    }
    navigate(`/reader/${id}/${pages[0].id}`)
  }, [sites])

  return (
    <div className="relative h-full overflow-hidden flex">
      <div className="relative flex-shrink-0 w-80 flex flex-col h-full overflow-hidden border-r border-solid border-gray-300">
        <div className="relative p-2 border-b border-solid border-gray-300">
          <Button className="w-full" onClick={handleCreate}>新建</Button>
        </div>
        <div className="relative h-full overflow-y-auto">
          {sites.map((site) => {
            return (
              <ActionMenu
                key={site.id}
                items={[
                  { id: 'enter', label: '使用', onClick: () => handleEnter(site.id) },
                  { id: 'delete', label: '删除', onClick: () => handleDelete(site.id), className: 'text-red-500' },
                ]}
              >
                <div
                  onClick={() => handleSelectSite(site.id)}
                  className={
                    cn(
                      "h-28 border-b border-solid border-gray-100",
                      "p-4 pb-2 w-full overflow-hidden flex flex-col h-28",
                      currentSiteId === site.id ? "bg-gray-100" : ""
                    )
                  }
                >
                  <div className="w-full overflow-hidden flex-grow h-full flex">
                    <div className="flex flex-col flex-grow h-full pr-1">
                      <h3 className="font-semibold leading-none tracking-tight text-sm">
                        {site.common.siteName}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-4 line-clamp-2 w-full whitespace-normal break-all text-wrap">
                        {site.common.description}
                      </p>
                    </div>
                    {site.common.siteIcon && (
                      <div className="w-8 flex-shrink-0">
                        <img src={site.common.siteIcon} alt="site icon" className="w-full" />
                      </div>
                    )}
                  </div>
                  {/* <div className="action flex-shrink-0 text-xs flex justify-end"></div> */}
                </div>
              </ActionMenu>
            )
          })}
        </div>
      </div>
      <div className="relative flex-grow h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
})

export default SiteSelect
