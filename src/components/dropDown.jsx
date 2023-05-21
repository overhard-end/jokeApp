import { Dropdown, Loading, Spacer } from '@nextui-org/react';
import React from 'react';

export const DropDown = ({ handleParams, allItems, type }) => {
  const [currentItem, setCurrentItem] = React.useState(new Set([type]));
  const current = React.useMemo(
    () => Array.from(currentItem).join(', ').replaceAll('_', ' '),
    [currentItem],
  );
  React.useEffect(() => {
    if (current === type) return;
    handleParams({ type: type, current: current });
  }, [current]);

  return (
    <>
      <Spacer s={1} />
      <Dropdown>
        <Dropdown.Button flat>
          {!allItems ? <Loading size="xs" type="points" /> : current}
        </Dropdown.Button>
        <Dropdown.Menu
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={currentItem}
          onSelectionChange={setCurrentItem}
          aria-label="Static Action">
          {!allItems
            ? ''
            : allItems.map((item) => (
                <Dropdown.Item textValue={item} key={item}>
                  {item}
                </Dropdown.Item>
              ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
