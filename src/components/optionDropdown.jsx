import { Dropdown } from '@nextui-org/react';
import React from 'react';
import axios from 'axios';

export const OptionDropdown = ({ handleOptionDropdown }) => {
  const [allJokeOptions, setAllJokeOptions] = React.useState();
  const [currentJokeOption, setCurrentJokeOption] = React.useState(new Set(['twopart']));
  const jokeOption = React.useMemo(
    () => Array.from(currentJokeOption).join(', ').replaceAll('_', ' '),
    [currentJokeOption],
  );
  React.useEffect(() => {
    handleOptionDropdown(jokeOption);
  }, [jokeOption]);
  React.useEffect(() => {
    async function getJokeOptions() {
      const res = await axios.get('/info');
      setAllJokeOptions(res.data.jokes.types);
    }
    getJokeOptions();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Button flat>{jokeOption}</Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={currentJokeOption}
        onSelectionChange={setCurrentJokeOption}
        aria-label="Static Actions">
        {allJokeOptions
          ? allJokeOptions.map((opt) => <Dropdown.Item key={opt}>{opt} </Dropdown.Item>)
          : ''}
      </Dropdown.Menu>
    </Dropdown>
  );
};
