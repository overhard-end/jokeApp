import { Row } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { api } from '../axios';
import { DropDown } from './dropDown';
export const DropDownArea = ({ getJokeParams }) => {
  const [fetchedParams, setFetchedParams] = React.useState(false);

  const handleParams = (param) => {
    switch (param.type) {
      case 'lang':
        return getJokeParams({ lang: param.current });
      case 'type':
        return getJokeParams({ type: param.current });
      case 'opt':
        return getJokeParams({ opt: param.current });
      default:
        break;
    }
  };

  useEffect(() => {
    async function fetchJokeParams() {
      await Promise.all(
        ['/info', '/languages'].map((endpoint) => api.get(endpoint).then((res) => res)),
      ).then((apiData) => {
        if (apiData.some((obj) => obj.data?.error === true)) return;
        const { categories, types } = apiData.filter((obj) => obj.config.url === '/info')[0].data
          ?.jokes;
        const { jokeLanguages } = apiData.filter((obj) => obj.config.url === '/languages')[0].data;
        setFetchedParams({
          opts: types,
          types: categories,
          langs: jokeLanguages,
        });
      });
    }
    fetchJokeParams();
  }, []);
  const getItems = (type, fetchedParams) => {
    switch (type) {
      case 'lang':
        return fetchedParams.langs;
      case 'type':
        return fetchedParams.types;
      case 'opt':
        return fetchedParams.opts;
      default:
        break;
    }
  };
  return ['lang', 'opt', 'type'].map((type) => (
    <DropDown
      key={type}
      allItems={getItems(type, fetchedParams)}
      handleParams={handleParams}
      type={type}
    />
  ));
};
