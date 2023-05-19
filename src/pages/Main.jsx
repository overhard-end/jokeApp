import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Text,
  Button,
  Progress,
  Grid,
  Card,
  Spacer,
  Navbar,
} from '@nextui-org/react';
import axios from 'axios';
import { LangDropdown } from '../components/langDropdown';
import { TypeDropdown } from '../components/typeDropdown';
import { OptionDropdown } from '../components/optionDropdown';
export const Main = () => {
  const [jokeType, setJokeType] = React.useState('any');
  const [jokeLang, setJokeLang] = React.useState();
  const [jokeOption, setjokeOption] = React.useState('twopart');
  const [error, setError] = React.useState(false);

  const [joke, setJoke] = React.useState();

  const handleSelectedLang = (lang) => setJokeLang(lang);
  const handleSelectedType = (type) => setJokeType(type);
  const handleOptionDropdown = (opt) => setjokeOption(opt);

  async function getJoke() {
    const response = await axios.get(`joke/${jokeType}`, {
      params: { format: 'json', lang: jokeLang, type: jokeOption },
    });
    if (response.data.error) return setError(response.data.message);
    setError(false);
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
            color="inherit"
            hideIn="xs">
            Joker
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <LangDropdown handleSelectedLang={handleSelectedLang} />
          <TypeDropdown handleSelectedType={handleSelectedType} />
          <OptionDropdown handleOptionDropdown={handleOptionDropdown} />
        </Navbar.Content>
      </Navbar>
      <Container css={{ paddingTop: '100px' }} md justify="space-between" display="flex">
        {error ? (
          <Text>{error}</Text>
        ) : !joke ? (
          <Grid.Container xs={12} sm={6} gap={2}>
            <Grid>
              <Progress indeterminated value={50} color="secondary" status="secondary" />
            </Grid>
          </Grid.Container>
        ) : joke.type === 'twopart' ? (
          <Card>
            <Text
              blockquote
              css={{
                color: '$mycolor',
                fontSize: '20px',
                padding: '$2 $4',
              }}>
              {joke.setup ? joke.setup : joke.joke}
            </Text>
            <Text
              blockquote
              css={{
                color: '$mycolor',
                fontSize: '20px',
                padding: '$2 $4',
              }}>
              {joke.delivery}
            </Text>
          </Card>
        ) : (
          <Card>
            <Text
              blockquote
              css={{
                color: '$mycolor',
                fontSize: '20px',
                padding: '$2 $4',
              }}>
              {joke.joke}
            </Text>
          </Card>
        )}

        <Row gap={0}></Row>
        <Spacer />
        <Row justify="center">
          <Button onPress={() => getJoke()}> Get new Joke</Button>
        </Row>
      </Container>
    </>
  );
};
