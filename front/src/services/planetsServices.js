import axiosInstance from '../api/axios'

export const getPlanets = async (page = 1) => {
  const response = await axiosInstance.get(`planets/${page}`);
  return response.data;
};