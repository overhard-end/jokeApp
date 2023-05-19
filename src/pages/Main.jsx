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
  const [joke, setJoke] = React.useState();

  async function getJoke() {
    const response = await axios.get(`joke/any`, {});
    if (response.data.error) return setError(response.data.message);
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
        <Navbar.Content></Navbar.Content>
      </Navbar>
      <Container css={{ paddingTop: '100px' }} md justify="space-between" display="flex">
        <Spacer />
        <Row justify="center">
          <Button onPress={() => getJoke()}> Get new Joke</Button>
        </Row>
      </Container>
    </>
  );
};
