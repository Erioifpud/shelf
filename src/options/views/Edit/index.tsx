import { memo, useContext } from 'react';
import { EditContext } from './context/ctx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { Button } from '~components/ui/button';
import { MenuIcon } from 'lucide-react';

const EditPage = memo(() => {
  const { drawerVisible, setDrawerVisible } = useContext(EditContext);

  return (
    <div className="relative h-full overflow-hidden flex flex-col">
      <div className="flex-shrink-0 h-14 flex items-center px-4 border-b border-solid border-gray-500 bg-gray-700">
        <Sheet open={drawerVisible} onOpenChange={setDrawerVisible}>
          <SheetTrigger>
            <Button size="icon">
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative flex-grow">EditPage</div>
    </div>
  );
});

export default EditPage;
