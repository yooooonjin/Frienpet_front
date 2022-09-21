import axios from 'axios';
const apiKey = process.env.REACT_APP_ABANDONMENT_API_KEY;

export const addrlink = async () => {
  console.log('dldld?');

  try {
    await axios
      .get(`/addrlink/addrLinkUrl.do`, {
        params: {
          confmKey: 'devU01TX0FVVEgyMDIyMDkyMTE2NDc0MTExMjk5MTA=',
          returnUrl: 'http://localhost:3000/join',
        },
      })
      .then((res) => console.log(res));
  } catch (error) {
    console.error(error);
  }
};
// export const addrlink = async () => {
//   try {
//     return await axios.get(
//       `https://business.juso.go.kr/addrlink/addrLinkUrl.do?confmKey=devU01TX0FVVEgyMDIyMDkyMTE2NDc0MTExMjk5MTA=&returnUrl=http://localhost:3000/join`
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };
