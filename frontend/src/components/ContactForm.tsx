import React, { useState } from 'react';
import { ContactInput } from '../types/Contact';
import { contactsApi } from '../services/api';
import { User, Mail, Phone, Plus } from 'lucide-react';

interface ContactFormProps {
  onContactAdded: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onContactAdded }) => {
  const [formData, setFormData] = useState<ContactInput>({
    name: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);
    
    try {
      await contactsApi.createContact({
        ...formData,
        phone: formData.phone.replace(/\D/g, ''), // Remove non-digit characters
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
      
      onContactAdded();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setSubmitError(error.response?.data?.message || 'Failed to add contact. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plus className="w-6 h-6 text-primary-500" />
        Add New Contact
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter full name"
            disabled={isSubmitting}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter email address"
            disabled={isSubmitting}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="Enter 10-digit phone number"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner w-4 h-4"></div>
              Adding Contact...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Contact
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;