import { createContext } from 'react';

interface ContextValue {
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
}

export const ReaderContext = createContext<ContextValue>({
  drawerVisible: false,
  setDrawerVisible: () => {},
});