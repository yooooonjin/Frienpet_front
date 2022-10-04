import axios from 'axios';
import { Animal } from '../page/join/JoinPage';

type SaveAnimal = Animal & { userid: string };

//반려동물 정보 입력
export const savePetInfo = async (animal: SaveAnimal) => {
  await axios.post('/api/animal/save', animal);
};
//반려동물 정보 불러오기
export const getPetInfo = async (email: string) => {
  const result = await axios.get('/api/animal', { params: { email } });
  return result.data[0];
};
//반려동물 정보 수정하기
export const updatePetInfo = async (myPet: Animal) => {
  const result = await axios.put('/api/animal/update', myPet);
};
