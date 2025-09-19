import axios from 'axios';
import { Contact, ContactInput, PaginatedResponse } from '../types/Contact';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export const contactsApi = {
  // Get paginated contacts
  getContacts: async (page = 1, limit = 10): Promise<PaginatedResponse<Contact>> => {
    const response = await api.get(`/contacts?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Create new contact
  createContact: async (contact: ContactInput): Promise<Contact> => {
    const response = await api.post('/contacts', contact);
    return response.data;
  },

  // Delete contact by ID
  deleteContact: async (id: number): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },
};

export default api;