import { Router } from 'express';
import { createContact, getContacts, deleteContact } from '../controllers/contactController.js';

const router = Router();

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact
 * @access  Public
 */
router.post('/', createContact);

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts with pagination
 * @query   page - Page number (default: 1)
 * @query   limit - Items per page (default: 10, max: 50)
 * @access  Public
 */
router.get('/', getContacts);

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete a contact by ID
 * @access  Public
 */
router.delete('/:id', deleteContact);

export default router;