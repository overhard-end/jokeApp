import { NextUIProvider } from '@nextui-org/react';

import { Theme } from './components/theme';
import { Main } from './pages/Main';
function App() {
  return (
    <NextUIProvider theme={Theme}>
      <Main />
    </NextUIProvider>
  );
}
export default App;
