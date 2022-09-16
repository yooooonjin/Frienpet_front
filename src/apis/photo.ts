import axios from 'axios';

//반려동물 사진 입력
export const savePetPhoto = async (photo: {
  petid: string;
  url: string;
  order: string;
}) => {
  await axios.post('/api/animal/photo/save', photo);
};
//반려동물 사진 불러오기
export const getPetPhoto = async (petid: string) => {
  const result = await axios.get('/api/animal/photo', { params: { petid } });
  return result.data;
};
