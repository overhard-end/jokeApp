import { Dropdown } from '@nextui-org/react';
import React from 'react';
import axios from 'axios';
export const TypeDropdown = ({ handleSelectedType }) => {
  const [allJokeTypes, setAllJokeTypes] = React.useState(false);
  const [currentJokeType, setCurrentJokeType] = React.useState(new Set(['any']));

  const jokeType = React.useMemo(
    () => Array.from(currentJokeType).join(', ').replaceAll('_', ' '),
    [currentJokeType],
  );
  React.useEffect(() => {
    handleSelectedType(jokeType);
  }, [jokeType]);

  React.useEffect(() => {
    async function getJokeInfo() {
      const response = await axios.get('/info');
      setAllJokeTypes(response.data.jokes.categories);
    }
    getJokeInfo();
  }, []);
  return (
    <Dropdown>
      <Dropdown.Button flat>{jokeType}</Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={currentJokeType}
        onSelectionChange={setCurrentJokeType}
        aria-label="Static Actions">
        {allJokeTypes
          ? allJokeTypes.map((jokeType) => (
              <Dropdown.Item key={jokeType}>{jokeType} </Dropdown.Item>
            ))
          : ''}
      </Dropdown.Menu>
    </Dropdown>
  );
};
