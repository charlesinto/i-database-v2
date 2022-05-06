import Axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://i-database-v2.herokuapp.com"
    : "http://localhost:3004";

export const getCoinPairReport = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.get(`${apiUrl}/api/v1/auth/get-coin-report`);

      return resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSettingConfiguration = () => {
  return Axios.get(`${apiUrl}/api/v1/bot/get-configuration`);
};

export const updateSettingConfiguration = (payload) => {
  return Axios.patch(`${apiUrl}/api/v1/bot/update-configuration`, payload);
};
