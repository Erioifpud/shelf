import { memo, useCallback, useContext } from 'react';
import { ReaderContext } from '../../context/ctx';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '~/components/ui/sheet'
import { Button } from '~components/ui/button';
import { MenuIcon } from 'lucide-react';
import { usePageAndSite } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const PageDrawer = memo(() => {
  const { drawerVisible, setDrawerVisible } = useContext(ReaderContext)
  const { site } = usePageAndSite()
  const navigate = useNavigate()

  const handleClick = useCallback((pageId: string) => {
    if (!site) {
      return
    }
    navigate(`/reader/${site.id}/${pageId}`, {
      replace: true,
    })
    setDrawerVisible(false)
  }, [site, setDrawerVisible, navigate])

  return (
    <Sheet open={drawerVisible} onOpenChange={setDrawerVisible}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon></MenuIcon>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col h-full overflow-hidden mt-2">
          <div className="text-lg flex-shrink-0 py-2">页面</div>
          <div className="flex-grow h-full overflow-y-auto">
            {site?.pages.map((page) => (
              <div key={page.id} className="p-2 hover:bg-accent cursor-pointer select-none" onClick={() => handleClick(page.id)}>
                {page.title}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
})

export default PageDrawer
