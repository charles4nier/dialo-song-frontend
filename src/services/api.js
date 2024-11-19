// services/api.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const fetchAPI = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('url:', url);
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        // ...options.headers,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
  
    return response.json();
  };
  
export const getData = (endpoint) => fetchAPI(endpoint, { method: 'GET' });

export const postData = (endpoint, data) => fetchAPI(endpoint, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const getStrapiUrl = (path = '') => {
  return `${process.env.NEXT_PUBLIC_LOCALHOST_URL || 'http://localhost:1337'}${path}`;
};