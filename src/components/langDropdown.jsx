import { Dropdown } from '@nextui-org/react';
import React from 'react';
import axios from 'axios';

export const LangDropdown = ({ handleSelectedLang }) => {
  const [allJokeLangs, setAllJokeLangs] = React.useState();
  const [currentJokeLang, setCurrentJokeLang] = React.useState(new Set(['en']));
  const jokeLang = React.useMemo(
    () => Array.from(currentJokeLang).join(', ').replaceAll('_', ' '),
    [currentJokeLang],
  );
  React.useEffect(() => {
    handleSelectedLang(jokeLang);
  }, [jokeLang]);

  React.useEffect(() => {
    async function getJokeLangs() {
      const res = await axios.get('/languages');
      setAllJokeLangs(res.data.jokeLanguages);
    }
    getJokeLangs();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Button flat>{jokeLang}</Dropdown.Button>
      <Dropdown.Menu
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={currentJokeLang}
        onSelectionChange={setCurrentJokeLang}
        aria-label="Static Actions">
        {allJokeLangs
          ? allJokeLangs.map((lang) => <Dropdown.Item key={lang}>{lang} </Dropdown.Item>)
          : ''}
      </Dropdown.Menu>
    </Dropdown>
  );
};
