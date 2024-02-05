import client from './client';

const endpoint = '/products';
const categories = '/products/categories';

const getProducts = () => client.get(endpoint);
const getCategories = () => client.get(endpoint + '/categories');
const getProductsFromCategory = category =>
  client.get(endpoint + `/category/${category}`);
const getProductsBySearch = search =>
  client.get(endpoint + `/search?q=${search}`);

export default {
  getProducts,
  getCategories,
  getProductsFromCategory,
  getProductsBySearch,
};
