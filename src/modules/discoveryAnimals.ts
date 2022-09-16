import { DiscoveryAnimal } from '../page/discovery/DiscoveryPage';

//액션 타입 만들기
const SET_DISCOVERY_ANIMALS = 'animal/SET_DISCOVERY_ANIMALS';

//액션 생성함수 만들기

export const setDiscoveryAnimals = (
  discoveryAnimals: Array<DiscoveryAnimal>
) => ({
  type: SET_DISCOVERY_ANIMALS,
  discoveryAnimals,
});

//초기상태 선언
const initialState = [
  {
    discoveryid: '',
    upr_cd: '',
    org_cd: '',
    location: '',
    upkind: '',
    kind: '',
    size: '',
    color: '',
    gender: '',
    desc: '',
    photo: '',
    createddate: '',
  },
];

type DiscoveryAnimals = ReturnType<typeof setDiscoveryAnimals>;

//리듀서 선언
export default function discoveryAnimals(
  state = initialState,
  action: DiscoveryAnimals
) {
  switch (action.type) {
    case SET_DISCOVERY_ANIMALS:
      return action.discoveryAnimals;

    default:
      return state;
  }
}
