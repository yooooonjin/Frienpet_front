import axios from 'axios';
import { DiscoveryAnimal } from '../page/discovery/DiscoveryPage';

type SaveDiscoveryAnimal = DiscoveryAnimal & { email: string };

//발견한 동물 정보 입력
export const saveDiscoveryAnimalInfo = async (
  discoveryAnimal: SaveDiscoveryAnimal
) => {
  console.log('discoveryAnimal', discoveryAnimal);

  await axios.post('/api/discovery/save', discoveryAnimal);
};
//발견한 동물 정보 불러오기
export const getDiscoveryAnimalInfo = async (
  range: string,
  address: string
) => {
  const result = await axios.get('/api/discovery', {
    params: { range, address },
  });
  return result.data;
};
