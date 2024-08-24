import { createContext } from 'react';

interface ContextValue {
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
}

export const EditContext = createContext<ContextValue>({
  drawerVisible: false,
  setDrawerVisible: () => {},
});