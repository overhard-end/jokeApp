import React, { useEffect, useState } from 'react';
import { Container, Row, Text, Button, Navbar, Switch, Col } from '@nextui-org/react';
import { MainText } from '../components/mainText';
import { LoadingElement } from '../components/loading';
import { api } from '../axios';
import { DropDownArea } from '../components/dropDownArea';
import { SwitchArea } from '../components/switchArea';

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
          <SwitchArea />
          <Row gap={0}>
            <DropDownArea getJokeParams={getJokeParams} />
          </Row>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem>
            <Col gap={0}>
              <DropDownArea getJokeParams={getJokeParams} />
            </Col>
            <SwitchArea />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      {isLoading ? (
        <LoadingElement />
      ) : (
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
      )}
    </>
  );
};
