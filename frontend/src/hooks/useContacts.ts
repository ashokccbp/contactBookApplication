import { useState, useEffect, useCallback } from 'react';
import { Contact, PaginatedResponse } from '../types/Contact';
import { contactsApi } from '../services/api';

interface UseContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  pagination: PaginatedResponse<Contact>['pagination'] | null;
}

export const useContacts = (initialPage = 1, limit = 10) => {
  const [state, setState] = useState<UseContactsState>({
    contacts: [],
    loading: true,
    error: null,
    pagination: null,
  });
  
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchContacts = useCallback(async (page = currentPage) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await contactsApi.getContacts(page, limit);
      setState({
        contacts: response.data,
        loading: false,
        error: null,
        pagination: response.pagination,
      });
      setCurrentPage(page);
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch contacts',
      }));
    }
  }, [currentPage, limit]);

  const deleteContact = useCallback(async (id: number) => {
    try {
      await contactsApi.deleteContact(id);
      // Refresh the current page after deletion
      await fetchContacts(currentPage);
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Failed to delete contact',
      }));
    }
  }, [currentPage, fetchContacts]);

  const refreshContacts = useCallback(() => {
    fetchContacts(currentPage);
  }, [fetchContacts, currentPage]);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [fetchContacts, currentPage]);

  return {
    contacts: state.contacts,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    currentPage,
    fetchContacts,
    deleteContact,
    refreshContacts,
    setPage: (page: number) => fetchContacts(page),
  };
};