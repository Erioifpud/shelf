import { memo } from 'react';

const CommonEdit = memo(() => {
  return (
    <div className="relative h-full overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold">Edit</div>
            <div className="text-sm text-muted-foreground">Edit your options</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CommonEdit
