import { memo, useCallback, useEffect, useRef } from 'react';
import { useCurrentSite, usePages } from '../../hooks';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Button } from '~components/ui/button';
import { useDispatch } from 'react-redux';
import { createPage, updateSite } from '~store/site/site-slice';
import { EditIcon, Trash2Icon } from 'lucide-react';
import Sortable from 'sortablejs'
import { Outlet, useNavigate } from 'react-router-dom';

const PageEdit = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sortableRef = useRef<Sortable>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const site = useCurrentSite();
  const pages = usePages();

  // 添加页面
  const handlePageAdd = useCallback(() => {
    dispatch(createPage(site.id))
  }, [dispatch])

  // 页面排序
  const handleSortPages = useCallback((from: number, to: number) => {
    const tempPages = JSON.parse(JSON.stringify(pages))
    const page = tempPages[from]
    tempPages.splice(from, 1)
    tempPages.splice(to, 0, page)
    dispatch(updateSite({
      id: site.id,
      pages: tempPages
    }))
  }, [dispatch, site])

  // 删除页面
  const handleDeletePage = useCallback((pageId: string) => {
    dispatch(updateSite({
      id: site.id,
      pages: pages.filter(page => page.id !== pageId)
    }))
  }, [dispatch, site, pages])

  // 编辑页面
  const handleEditPage = useCallback((pageId: string) => {
    navigate(`./${pageId}`, {
      relative: 'path'
    })
  }, [dispatch, site])

  useEffect(() => {
    sortableRef.current = new Sortable(containerRef.current, {
      sort: true,
      animation: 150,
      ghostClass: 'bg-gray-100',
      onEnd: (evt) => {
        handleSortPages(evt.oldIndex, evt.newIndex)
      }
    })
  }, [])

  // 站点不存在
  if (!site) {
    return <div>缺少该站点信息，请选择其他站点</div>
  }

  return (
    <div className="relative h-full overflow-hidden px-4 py-2 flex flex-col">
      <div className="relative flex-shrink-0 py-2">
        <Button
          variant="default"
          className="w-full"
          onClick={handlePageAdd}
        >添加页面</Button>
      </div>
      <div
        ref={containerRef}
        className="relative h-full overflow-y-auto grid grid-cols-4 auto-rows-min gap-4 flex-grow items-start"
      >
        {pages.map((page) => {
          return (
            <Card className="flex-shrink-0" key={page.id} data-id={page.id}>
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <div className="flex justify-end w-full gap-4">
                  <EditIcon
                    className="w-4 text-blue-500 cursor-pointer"
                    onClick={() => handleEditPage(page.id)}
                  />
                  <Trash2Icon
                    className="w-4 text-red-500 cursor-pointer"
                    onClick={() => handleDeletePage(page.id)}
                  />
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <Outlet />
    </div>
  );
});

export default PageEdit;
