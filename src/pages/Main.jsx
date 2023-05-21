import React, { useEffect, useState } from 'react';
import { Container, Row, Text, Button, Navbar } from '@nextui-org/react';
import { MainText } from '../components/mainText';
import { LoadingElement } from '../components/loading';
import { api } from '../axios';
import { DropDownArea } from '../components/dropDownArea';

export const Main = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [joke, setJoke] = useState();
  const [jokeParams, setJokeParams] = useState({ lang: 'en', opt: 'twopart', type: 'any' });
  const getJokeParams = (params) => setJokeParams({ ...jokeParams, ...params });
  async function getJoke() {
    setIsLoading(true);
    const response = await api.get(`joke/${jokeParams.type}`, {
      params: { format: 'json', lang: jokeParams.lang, type: jokeParams.opt },
    });
    if (response.data.error) return setError(response.data.message);
    setError(false);
    setIsLoading(false);
    setJoke(response.data);
  }
  useEffect(() => {
    getJoke();
  }, []);

  return (
    <>
      <Navbar isBordered variant="static">
        <Navbar.Brand>
          <Text
            css={{
              fontSize: '40px',
              padding: '$2 $4',
            }}
            color="inherit">
            Joker
          </Text>
        </Navbar.Brand>
        <Navbar.Toggle autoFocus={true} showIn="xs" aria-label="toggle navigation" />
        <Navbar.Content hideIn="xs">
          <DropDownArea getJokeParams={getJokeParams} />
        </Navbar.Content>
        <Navbar.Collapse>
          <DropDownArea getJokeParams={getJokeParams} />
        </Navbar.Collapse>
      </Navbar>
      <Container
        css={{ paddingTop: '50px', marginBottom: '30px', position: 'relative' }}
        md
        justify="center"
        display="flex">
        {error ? (
          <Text
            blockquote
            css={{
              color: '$mycolor',
              fontSize: '25px',
              padding: '$2 $4',
            }}>
            {error}
          </Text>
        ) : isLoading ? (
          <LoadingElement />
        ) : joke ? (
          <MainText joke={joke} />
        ) : (
          ''
        )}
        <Row justify="center" css={{ position: 'fixed', bottom: '30%' }}>
          <Button
            css={{ color: '$black', fontWeight: '$bold' }}
            color="primary"
            onPress={() => getJoke()}>
            GET NEW JOKE
          </Button>
        </Row>
      </Container>
    </>
  );
};
