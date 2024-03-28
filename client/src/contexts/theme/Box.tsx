import { useContext, useState } from 'react';
import { themeContext } from './ThemeContext';
const Box = () => {
  const theme = useContext(themeContext);
  const [isLight, setisLight] = useState<boolean>(false);
  const handleTheme = (): void => {
    setisLight((pre) => !pre);
  };
  return (
    <>
      {isLight && (
        <div
          style={{ backgroundColor: theme.light.main, color: theme.light.text }}
        >
          Box
        </div>
      )}
      {!isLight && (
        <div
          style={{ backgroundColor: theme.dark.main, color: theme.dark.text }}
        >
          Box
        </div>
      )}
      <button className="btn btn-secondary m-1" onClick={handleTheme}>
        {isLight ? 'light' : 'dark'}
      </button>
    </>
  );
};

export default Box;
