import axiosInstance from '../api/axios'

export const getStarships = async (page = 1) => {
  return await axiosInstance.get(`starships/${page}`);
};