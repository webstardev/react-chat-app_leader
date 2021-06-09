import axiosInstance from '../lib/axios';

export const loginAPI = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    try {
      axiosInstance
        .post(
          `/Login?user=${username}&password=${password}`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};
