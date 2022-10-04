import { HeartAnimal } from '../apis/homeless';

//액션 타입 만들기
const SET_HEART_ANIMALS = 'heartAnimals/SET_HEART_ANIMALS' as const;
const ADD_HEART_ANIMAL = 'heartAnimals/ADD_HEART_ANIMAL' as const;
const REMOVE_HEART_ANIMAL = 'heartAnimals/DELETE_HEART_ANIMAL' as const;

//액션 생성함수 만들기

export const setHeartAnimals = (heartAnimals: Array<HeartAnimal>) => ({
  type: SET_HEART_ANIMALS,
  heartAnimals,
});
export const addHeartAnimal = (addHeartAnimal: HeartAnimal) => ({
  type: ADD_HEART_ANIMAL,
  addHeartAnimal,
});
export const removeHeartAnimal = (removeHeartNoticeNo: string) => ({
  type: REMOVE_HEART_ANIMAL,
  removeHeartNoticeNo,
});

//초기상태 선언
const initialState = [
  {
    userId: '',
    noticeNo: '',
    filename: '',
    careNm: '',
    careTel: '',
    noticeEdt: '',
  },
];

type HeartAnimalsAction =
  | ReturnType<typeof setHeartAnimals>
  | ReturnType<typeof addHeartAnimal>
  | ReturnType<typeof removeHeartAnimal>;

//리듀서 선언
export default function heartAnimals(
  state = initialState,
  action: HeartAnimalsAction
) {
  switch (action.type) {
    case SET_HEART_ANIMALS:
      return action.heartAnimals;
    case ADD_HEART_ANIMAL:
      return [...state, action.addHeartAnimal];
    case REMOVE_HEART_ANIMAL:
      const newState = state.filter(
        (animal) => animal.noticeNo !== action.removeHeartNoticeNo
      );
      return newState;

    default:
      return state;
  }
}
