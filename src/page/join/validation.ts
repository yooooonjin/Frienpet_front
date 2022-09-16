import { User } from './JoinPage';
export const SignupValidation = (
  element: string,
  value: string,
  user: User
) => {
  switch (element) {
    case 'email':
      var emailReg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      https: if (!emailReg.test(value)) {
        return '이메일 주소를 다시 확인해주세요.';
      } else {
        return value;
      }
    case 'name':
      var nameLength = value.length;
      if (2 > nameLength || nameLength > 11) {
        return '2~10자로 입력해주세요.';
      } else {
        return value;
      }
    case 'pw':
      var passwordReg =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      if (!passwordReg.test(value)) {
        return '특수문자 / 문자 / 숫자 포함 형태의 8~16자로 입력해주세요.';
      } else {
        return value;
      }
    case 're_pw':
      if (value !== user.pw) {
        return '비밀번호가 일치하지 않습니다.';
      } else {
        return value;
      }
    case 'phone':
      var phoneReg = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      if (!phoneReg.test(value)) {
        return '전화번호를 정확히 입력해주세요.';
      } else {
        return value;
      }
    default:
      break;
  }
};
