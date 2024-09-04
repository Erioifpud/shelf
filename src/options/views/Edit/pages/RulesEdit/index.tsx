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
import { createSiteRule, updateSite } from '~store/site/site-slice';
import { EditIcon, Trash2Icon } from 'lucide-react';
import Sortable from 'sortablejs'
import { Outlet, useNavigate } from 'react-router-dom';
import type { RuleProps } from '~store/site/type';

interface Props {
  ruleName: RuleProps
}

const RulesEdit = memo((props: Props) => {
  const { ruleName } = props

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const site = useCurrentSite();

  // 添加规则
  const handlePageAdd = useCallback(() => {
    dispatch(createSiteRule({
      siteId: site.id,
      ruleName,
    }))
  }, [dispatch, site, ruleName])

  // 删除规则
  const handleDeleteRule = useCallback((ruleId: string) => {
    dispatch(updateSite({
      id: site.id,
      [ruleName]: site[ruleName].filter(item => item.id !== ruleId)
    }))
  }, [dispatch, site, ruleName])

  // 编辑规则
  const handleEditRule = useCallback((ruleId: string) => {
    navigate(`./${ruleId}`, {
      relative: 'path'
    })
  }, [dispatch])

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
        className="relative h-full overflow-y-auto grid grid-cols-4 auto-rows-min gap-4 flex-grow items-start"
      >
        {site[ruleName].map((rule) => {
          return (
            <Card className="flex-shrink-0" key={rule.id} data-id={rule.id}>
              <CardHeader>
                <CardTitle>{rule.name}</CardTitle>
              </CardHeader>
              <CardFooter>
                <div className="flex justify-end w-full gap-4">
                  <EditIcon
                    className="w-4 text-blue-500 cursor-pointer"
                    onClick={() => handleEditRule(rule.id)}
                  />
                  <Trash2Icon
                    className="w-4 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteRule(rule.id)}
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

export default RulesEdit;
