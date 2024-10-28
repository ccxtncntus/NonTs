/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext } from 'react';
import { theme } from './Theme';

type themType = {
  children: ReactNode;
};
export const themeContext = createContext(theme);

export const ThemeContextProvider = ({ children }: themType) => {
  return (
    <>
      <themeContext.Provider value={theme}>{children}</themeContext.Provider>
    </>
  );
};
