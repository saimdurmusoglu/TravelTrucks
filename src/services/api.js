import axios from 'axios';

/**
 * Axios instance configuration.
 * Centralizes the base URL for MockAPI to ensure consistency across all requests.
 */
const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

/**
 * Fetches a list of campers from the /campers endpoint.
 * @param {Object} params - Optional parameters for backend-side filtering and pagination.
 * @returns {Promise} Axios response promise.
 */
export const fetchCampers = (params) => {
  return api.get('/campers', { params });
};

/**
 * Fetches the detailed information of a specific camper.
 * @param {string} id - The unique identifier of the camper.
 * @returns {Promise} Axios response promise.
 */
export const fetchCamperDetails = (id) => {
  return api.get(`/campers/${id}`);
};

export default api;