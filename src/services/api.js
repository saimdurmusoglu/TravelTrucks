import axios from 'axios'; // HTTP istekleri için axios kütüphanesi

// Axios yapılandırması: Genel ayarların yapıldığı bir örnek (instance) oluşturulur
const api = axios.create({
  // MockAPI ana adresi: Tüm istekler bu adres üzerinden gönderilir
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

/**
 * Tüm kamp araçlarını getiren fonksiyon.
 * @param {Object} params - Sayfalama, filtreleme gibi isteğe bağlı parametreler.
 * @returns {Promise} API yanıtı.
 */
export const fetchCampers = (params) => {
  // GET isteği: /campers endpoint'ine gönderilir, varsa parametreler eklenir
  return api.get('/campers', { params });
};

/**
 * Belirli bir kamp aracının detaylarını getiren fonksiyon.
 * @param {string} id - Detayı istenen aracın benzersiz kimliği.
 * @returns {Promise} API yanıtı.
 */
export const fetchCamperDetails = (id) => {
  // GET isteği: Dinamik ID kullanılarak spesifik bir araca erişilir
  return api.get(`/campers/${id}`);
};

export default api; // Varsayılan olarak api örneğini dışa aktar