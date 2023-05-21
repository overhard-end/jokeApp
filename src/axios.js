import axios from 'axios';

export const api = axios.create({ baseURL: 'https://v2.jokeapi.dev' });
