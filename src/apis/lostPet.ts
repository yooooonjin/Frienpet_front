import { Helper } from './../page/lostPet/LostPetPage';
import { Animal } from '../page/join/JoinPage';
import { getPetInfo } from './pet';
import { LostPet } from '../page/lostPet/LostPetPage';
import axios from 'axios';

//잃어버린 상황 입력
export const saveLostpet = async (finpet: LostPet) => {
  await axios.post('/api/lostpet/save', finpet);
};

//잃어버린 반려동물 정보 전체 불러오기
export const getLostAnimals = async () => {
  const result = await axios.get('/api/lostpet');
  return result.data;
};
//내가 잃어버린 반려동물 정보 불러오기
export const getLostPetByParam = async (params: { [key: string]: string }) => {
  const result = await axios.get('/api/lostpet/lostpetByparam', {
    params: params,
  });
  return result.data[0];
};

//게시글 삭제하기
export const deleteLostPet = async (lostpetid: string) => {
  await axios.delete('/api/lostpet/helpers', { params: { lostpetid } });
  await axios.delete('/api/lostpet', { params: { lostpetid } });
};

//반려동물 찾기 참여하기
export const saveLostpetHelper = async (helper: Helper) => {
  await axios.post('/api/lostpet/saveHelper', helper);
};
//반려동물 찾기 참여자 전체 불러오기
export const getAllHelpers = async () => {
  const result = await axios.get('/api/lostpet/allHelpers');
  return result.data;
};
//반려동물 찾기 참여자 불러오기
export const getHelpers = async (lostpetid: string) => {
  const result = await axios.get('/api/lostpet/helpers', {
    params: { lostpetid },
  });
  return result.data;
};

//반려동물 찾기 참여 삭제하기
export const deleteHelping = async (userid: string) => {
  await axios.delete('/api/lostpet/helpers', { params: { userid } });
};
