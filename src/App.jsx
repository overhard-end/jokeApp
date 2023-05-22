import { NextUIProvider } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { DarkTheme, LightTheme } from './components/theme';
import { Main } from './pages/Main';

function App() {
  const darkMode = useDarkMode(false);
  return (
    <NextUIProvider theme={darkMode.value ? DarkTheme : LightTheme}>
      <Main />
    </NextUIProvider>
  );
}
export default App;
