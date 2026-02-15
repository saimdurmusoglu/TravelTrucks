import axios from 'axios';

const api = axios.create({
  // MockAPI URL'in doğru, bunu koruyoruz
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

// Tüm karavanları getirmek için (Filtreleme parametrelerini destekler)
export const fetchCampers = (params) => {
  return api.get('/campers', { params });
};

// Tek bir karavanın detaylarını getirmek için (ID bazlı)
export const fetchCamperDetails = (id) => {
  return api.get(`/campers/${id}`);
};

export default api;