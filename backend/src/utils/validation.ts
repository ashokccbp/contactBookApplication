import Joi from 'joi';
import { ContactInput } from '../models/Contact.js';

export const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must not exceed 100 characters',
    }),
    
  email: Joi.string()
    .email()
    .max(255)
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'string.max': 'Email must not exceed 255 characters',
    }),
    
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please enter a valid 10-digit phone number',
    }),
});

export const validateContact = (data: ContactInput) => {
  return contactSchema.validate(data, { 
    abortEarly: false,
    stripUnknown: true 
  });
};