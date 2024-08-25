import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { RootState } from '~store';

const SiteSelect = memo(() => {
  const navigate = useNavigate()
  const sites = useSelector((state: RootState) => state.site.sites)

  return (
    <div className="relative h-full overflow-hidden flex flex-col">
      <div className="relative h-full overflow-y-auto p-4">
        {sites.map((site) => {
          return (
            <Card
              key={site.id}
              className="mb-2 cursor-pointer"
              onClick={() => navigate(`/edit/${site.id}`)}
            >
              <CardHeader>
                <CardTitle>{site.common.siteName}</CardTitle>
                <CardDescription>{site.common.description}</CardDescription>
              </CardHeader>
              {/* <CardContent>
                <p>Card Content</p>
              </CardContent> */}
            </Card>
          )
        })}
      </div>
    </div>
  )
})

export default SiteSelect
