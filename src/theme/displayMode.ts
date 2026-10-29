import { createContext, use } from 'react';
import { displayModeType } from './legacy/types';

export { useDisplayMode, DisplayModeContext };

const DisplayModeContext = createContext<{
  displayMode: displayModeType;
  setDisplayMode: (displayMode: displayModeType) => void;
}>({
  displayMode: 'darkMode',
  setDisplayMode: () => null,
});

const useDisplayMode = () => {
  return use(DisplayModeContext);
};
