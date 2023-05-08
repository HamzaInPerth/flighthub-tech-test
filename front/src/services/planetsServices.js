import axiosInstance from '../api/axios'

export const getPlanets = async (page = 1) => {
  return await axiosInstance.get(`planets/${page}`);
};