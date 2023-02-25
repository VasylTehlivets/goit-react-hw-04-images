import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '33190879-a40024b526a607573093145e5',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

export const fetchImages = async (query, page) => {
  try {
    const { data } = await axios.get(`?q=${query}&page=${page}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};