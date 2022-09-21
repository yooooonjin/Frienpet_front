import { User } from '../page/join/JoinPage';

//액션 타입 만들기
const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO' as const;
const LOGOUT = 'user/LOGOUT' as const;
const CHECK_STATUS = 'user/CHECK_STATUS' as const; //로그인 상태 확인

//액션 생성함수 만들기
export const setLoggedInfo = (loggedInfo: User) => ({
  type: SET_LOGGED_INFO,
  loggedInfo,
});
export const userLogout = () => ({ type: LOGOUT });
export const checkStatus = () => ({ type: CHECK_STATUS });

// type InitialStateType = { loggedInfo: User; logged: boolean };
//초기상태 선언
const initialState = {
  loggedInfo: {
    email: '',
    name: '',
    phone: '',
    sido: '',
    sigungu: '',
    bname: '',
  },
  logged: false, //현재 로그인중인지 확인
};

type UserAction =
  | ReturnType<typeof setLoggedInfo>
  | ReturnType<typeof userLogout>
  | ReturnType<typeof checkStatus>;

//리듀서 선언
export default function user(state = initialState, action: UserAction) {
  switch (action.type) {
    case SET_LOGGED_INFO:
      return { ...state, loggedInfo: action.loggedInfo, logged: true };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
