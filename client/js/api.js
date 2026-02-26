// ============================================
// API Helper — Centralizing fetch calls
// ============================================

const API_BASE_URL = 'http://localhost:3000/api';

async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Auto-inject auth token if available
    const token = localStorage.getItem('adminToken');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        const response = await fetch(url, options);
        let data = null;

        // Handle empty responses (like 204 No Content)
        if (response.status !== 204) {
            data = await response.json();
        }

        if (!response.ok) {
            throw new Error(data?.error || `API error: ${response.status}`);
        }

        return data;
    } catch (err) {
        console.error(`Fetch error on ${endpoint}:`, err);
        throw err;
    }
}

export { fetchAPI, API_BASE_URL };
