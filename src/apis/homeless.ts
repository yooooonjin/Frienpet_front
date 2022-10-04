import axios from 'axios';

export type HeartAnimal = {
  userId: string;
  noticeNo: string;
  filename: string;
  careNm: string;
  careTel: string;
  noticeEdt: string;
};

//하트를 누른 유기동물 정보 입력
export const saveHeartAnimalInfo = async (heartAnimal: HeartAnimal) => {
  await axios.post('/api/homeless/save', heartAnimal);
};
//하트를 누른 유기동물 정보 삭제
export const deleteHeartAnimal = async (userId: string, noticeNo: string) => {
  await axios.delete('/api/homeless', { params: { userId, noticeNo } });
};
//하트를 누른 유기동물 정보 불러오기
export const getHeartAnimalInfo = async (userId: string) => {
  const result = await axios.get('/api/homeless', {
    params: { userId },
  });
  return result.data;
};
