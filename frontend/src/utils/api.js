import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Optional: ensure consistent base URL
  withCredentials: true,
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error) // Handle request error
);

// ------------------- Books API -------------------
export const booksApi = {
  getAll: () => api.get('/books'),
  getFeatured: () => api.get('/books/featured'),
  getBySlug: (slug) => api.get(`/books/${slug}`),
  getById: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post('/books', bookData),
  update: (id, bookData) => api.put(`/books/${id}`, bookData),
  delete: (id) => api.delete(`/books/${id}`)
};

// ------------------- Blog API -------------------
export const blogApi = {
  getAll: () => api.get('/blog'),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (postData) => api.post('/blog', postData),
  update: (id, postData) => api.put(`/blog/${id}`, postData),
  delete: (id) => api.delete(`/blog/${id}`),
};

// ------------------- Gallery API -------------------
export const galleryApi = {
  getAll: () => api.get('/gallery'),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (itemData) => api.post('/gallery', itemData),
  update: (id, itemData) => api.put(`/gallery/${id}`, itemData),
  delete: (id) => api.delete(`/gallery/${id}`),
};

// ------------------- Contact API -------------------
export const contactApi = {
  sendMessage: (messageData) => api.post('/contact', messageData),
  getMessages: () => api.get('/contact'),
  markAsRead: (id) => api.put(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
};

// ------------------- Pages API -------------------
export const pagesApi = {
  get: () => api.get('/page'),          // GET hero section
  save: (pageData) => api.post('/page', pageData),  // POST hero section (create/update)
};

// ------------------- File Upload -------------------
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.filePath;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

export default api;
