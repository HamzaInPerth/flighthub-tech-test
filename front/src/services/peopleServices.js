import axiosInstance from '../api/axios'

export const getPeople = async (page = 1) => {
  return await axiosInstance.get(`people/${page}`);
};

export const searchPerson = async (name, newCancelTokenSource, page = 1) => {
  return await axiosInstance.get(`people/search/${name}/${page}`, { cancelToken: newCancelTokenSource.token })
}