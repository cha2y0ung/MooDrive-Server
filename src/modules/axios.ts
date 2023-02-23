import axios from 'axios';
import dotenv from 'dotenv';


// 로직상 거의 차이가 없는데도 불구하고 계속해서 함수를 만들어야 하는 상황
// 리팩토링 불가피해 보임
export const getAxiosFromNaverApi = async (path: string) => {
  return await axios
    .get(path, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NCP_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NCP_CLIENT_SECRET
      }
    })
    .then(response => response.data);
};