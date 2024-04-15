import axios from 'axios';

/**
 * Functions to interact with the API for values.
 * @namespace api
 */

const api = {
    /**
     * Fetches the minimum and maximum values.
     * @async
     * @function fetchMinMaxValues
     * @memberof api
     * @returns {Promise<{ min: number, max: number }>} The minimum and maximum values.
     * @throws {Error} Error if the request fails.
     */
    async fetchMinMaxValues() {
        try {
          const response = await axios.get('http://demo1400495.mockable.io/values');
          return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
    },
    /**
     * Fetches the minimum and maximum values of a range.
     * @async
     * @function fetchRangeMinMaxValues
     * @memberof api
     * @returns {Promise<{values[number]>} array of numbers.}
     * @throws {Error} Error if the request fails.
     */
    async fetchRangeMinMaxValues() {
        try {
          const response = await axios.get('http://demo1400495.mockable.io/rangevalues');
          return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
    }
}

export default api;