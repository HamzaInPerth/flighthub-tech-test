import axiosInstance from '../api/axios'

export const getStarships = async (page = 1) => {
  const response = await axiosInstance.get(`starships/${page}`);
  return response.data;
};