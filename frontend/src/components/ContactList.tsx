import React from 'react';
import { Contact } from '../types/Contact';
import { User, Mail, Phone, Trash2 } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  onDeleteContact: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  loading,
  error,
  onDeleteContact,
}) => {
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="card p-8">
        <div className="flex items-center justify-center">
          <div className="loading-spinner w-8 h-8"></div>
          <span className="ml-2 text-gray-600">Loading contacts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">Error loading contacts</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="card p-8">
        <div className="text-center text-gray-500">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No contacts found</h3>
          <p className="text-sm">Start by adding your first contact above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Contacts ({contacts.length})
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="card">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Added {formatDate(contact.created_at)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                  title="Delete contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary-600 transition-colors duration-200"
                  >
                    {contact.email}
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-primary-600 transition-colors duration-200"
                  >
                    {formatPhoneNumber(contact.phone)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;