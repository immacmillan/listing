/**
* Base URL for API calls.
* - In development: Vite proxies /api → localhost:3001 (vite.config.js)
* - In production: uses the VITE_API_URL environment variable
*/
const API_BASE = import.meta.env.VITE_API_URL
 ? `${import.meta.env.VITE_API_URL}/api`
 : '/api'


export default API_BASE
