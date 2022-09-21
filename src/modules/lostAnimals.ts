import { LostAnimal, LostPet } from './../page/lostPet/LostPetPage';
//액션 타입 만들기
const SET_LOST_MY_PET = 'lostAnimals/SET_LOST_MY_PET' as const;
const SET_HELPING = 'lostAnimals/SET_HELPING' as const;

//액션 생성함수 만들기
export const setLostMyPet = (lostAnimal: LostAnimal) => ({
  type: SET_LOST_MY_PET,
  lostAnimal,
});
export const setHelping = (helping: LostPet) => ({
  type: SET_HELPING,
  helping,
});

//초기상태 선언
const initialState = {
  lostMyPet: {
    lostpetid: '',
    petid: '',
    userid: '',
    phone: '',
    location: '',
    desc: '',
    createddate: '',
    helpers: {
      lostpetid: '',
      userid: '',
      name: '',
      phone: '',
    },
  },
  helping: {
    lostpetid: '',
    petid: '',
    userid: '',
    phone: '',
    location: '',
    desc: '',
    createddate: '',
  },
};

type LostAnimalsAction =
  | ReturnType<typeof setLostMyPet>
  | ReturnType<typeof setHelping>;

//리듀서 선언
export default function lostAnimals(
  state = initialState,
  action: LostAnimalsAction
) {
  switch (action.type) {
    case SET_LOST_MY_PET:
      return { ...state, lostMyPet: action.lostAnimal };
    case SET_HELPING:
      return { ...state, lostMyPet: action.helping };

    default:
      return state;
  }
}
