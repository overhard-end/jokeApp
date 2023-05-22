import { Switch, useTheme } from '@nextui-org/react';
import React from 'react';
import useDarkMode from 'use-dark-mode';
export const SwitchArea = () => {
  const { type, isDark } = useTheme();
  const darkMode = useDarkMode(false);
  return (
    <div>
      <Switch
        bordered
        iconOn={
          <box-icon animation="tada-hover" name="moon" type="solid" color="#ffffff"></box-icon>
        }
        iconOff={
          <box-icon animation="tada-hover" name="moon" type="solid" color="#000000"></box-icon>
        }
        checked={darkMode.value}
        onChange={() => darkMode.toggle()}
      />
    </div>
  );
};
