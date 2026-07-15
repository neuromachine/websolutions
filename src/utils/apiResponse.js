/**
 * Safely unwraps the standard CMS resource endpoint response (response.data.data).
 *
 * @param {Object} response - The Axios response object
 * @returns {any} The unwrapped payload or an empty object fallback
 */
export function unwrapResourceData(response) {
    if (response && response.data && response.data.data !== undefined) {
        return response.data.data;
    }
    console.warn('[apiResponse] Missing .data.data envelope in resource response', response);
    return response?.data || {};
}

/**
 * Safely unwraps a flat endpoint response (response.data).
 * Used for endpoints like individual commercial proposals (CP) / ind_offers.
 *
 * @param {Object} response - The Axios response object
 * @returns {any} The unwrapped payload or an empty object fallback
 */
export function unwrapFlatData(response) {
    if (response && response.data !== undefined) {
        // Warning if someone accidentally wraps a flat endpoint in another envelope
        if (response.data.data !== undefined) {
            console.warn('[apiResponse] Flat endpoint response seems to have .data.data envelope', response);
        }
        return response.data;
    }
    console.warn('[apiResponse] Missing .data in flat response', response);
    return {};
}
