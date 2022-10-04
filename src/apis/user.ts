import axios from 'axios';
import { User } from '../page/join/JoinPage';

//가입하기
export const join = async (user: User) => {
  await axios.post('/api/auth/join', user);
};
//이메일 중복 체크
export const emailCheck = async (email: string) => {
  const result = await axios.get('/api/auth/emailCheck', { params: { email } });
  return result.data[0].count;
};
//로그인
export const login = async (loginUser: { email: string; pw: string }) => {
  const result = await axios.post('/api/auth/login', loginUser);
  return result;
};
//로그아웃
export const logout = async () => {
  await axios.get('/api/auth/logout').then((res) => console.log(res));
};
//사용자 정보
export const getUserInfo = async (email: string) => {
  const result = await axios.get('/api/auth', { params: { email } });
  return result.data[0];
};
