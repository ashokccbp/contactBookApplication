import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Pagination from './components/Pagination';
import { useContacts } from './hooks/useContacts';
import { BookOpen, Users } from 'lucide-react';

function App() {
  const {
    contacts,
    loading,
    error,
    pagination,
    deleteContact,
    refreshContacts,
    setPage,
  } = useContacts(1, 6); // Show 6 contacts per page for better mobile experience

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">Contact Book</h1>
                <p className="text-sm text-gray-600">Demand Xpress Assignment</p>
              </div>
            </div>
            
            {pagination && (
              <div className="hidden sm:flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {pagination.total} total contacts
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <ContactForm onContactAdded={refreshContacts} />
          </div>
          
          {/* Contact List */}
          <div className="lg:col-span-2">
            <ContactList
              contacts={contacts}
              loading={loading}
              error={error}
              onDeleteContact={deleteContact}
            />
            
            {/* Pagination */}
            {pagination && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
                onPageChange={setPage}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Contact Book App - Built with React + Node.js + SQLite</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;