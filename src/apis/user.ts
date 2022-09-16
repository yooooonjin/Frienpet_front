import axios from 'axios';
import { User } from '../page/join/JoinPage';

export const join = async (user: User) => {
  await axios.post('/api/auth/join', user);
};

export const login = async (loginUser: { email: string; pw: string }) => {
  const result = await axios.post('/api/auth/login', loginUser);
  return result;
};

export const logout = async () => {
  await axios.get('/api/auth/logout').then((res) => console.log(res));
};

export const getUserInfo = async (email: string) => {
  const result = await axios.get('/api/auth', { params: { email } });
  return result.data[0];
};
