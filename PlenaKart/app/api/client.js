import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'https://dummyjson.com/',
});

export default apiClient;
