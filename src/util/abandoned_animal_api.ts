import { AnimalsFilter } from './../component/homeless/homeless';
import axios from 'axios';
const apiKey = process.env.REACT_APP_ABANDONMENT_API_KEY;

export const getSido = async (numOfRows: number) => {
  try {
    return await axios.get(
      `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?numOfRows=${numOfRows}&_type=json&serviceKey=${apiKey}`
      // ,
      // {
      //   params: {
      //     numOfRows: numOfRows,
      //     _type: 'json',
      //     serviceKey: apiKey,
      //   },
      //   withCredentials: true,
      // }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getSiGunGu = async (uprCd: string) => {
  try {
    return await axios.get(
      `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?upr_cd=${uprCd}&_type=json&serviceKey=${apiKey}`
      // {
      //   params: {
      //     upr_cd: uprCd,
      //     _type: 'json',
      //     serviceKey: apiKey,
      //   },
      // }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getAbandonmentPublic = async (filter: AnimalsFilter) => {
  try {
    return await axios.get(
      `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=${filter.bgnde}&endde=${filter.endde}&upkind=${filter.upkind}&upr_cd=${filter.upr_cd}&org_cd=${filter.org_cd}&V=${filter.state}&pageNo=${filter.pageNo}&numOfRows=${filter.numOfRows}&_type=json&serviceKey=${apiKey}`
    );
  } catch (error) {
    console.error(error);
  }
};
