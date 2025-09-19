import { Request, Response, NextFunction } from 'express';
import { dbRun, dbGet, dbAll } from '../utils/setupDatabase.js';
import { Contact, ContactInput, PaginatedResult } from '../models/Contact.js';
import { validateContact } from '../utils/validation.js';

interface PaginationQuery {
  page?: string;
  limit?: string;
}

export const createContact = async (
  req: Request<{}, {}, ContactInput>,
  res: Response<Contact>,
  next: NextFunction
) => {
  try {
    const { error, value } = validateContact(req.body);
    
    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach(detail => {
        errors[detail.path[0] as string] = detail.message;
      });
      return res.status(400).json({
        message: 'Validation failed',
        errors
      } as any);
    }

    const { name, email, phone } = value;
    
    // Check if email already exists
    const existingContact = await dbGet(
      'SELECT id FROM contacts WHERE email = ?',
      [email]
    );
    
    if (existingContact) {
      return res.status(409).json({
        message: 'A contact with this email already exists'
      } as any);
    }

    // Insert new contact
    const insertResult = await dbRun(
      'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );

    // Get the contact ID from the insert result
    const contactId = insertResult.lastID;

    // Fetch the created contact
    const contact = await dbGet(
      'SELECT * FROM contacts WHERE id = ?',
      [contactId]
    ) as Contact;

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (
  req: Request<{}, {}, {}, PaginationQuery>,
  res: Response<PaginatedResult<Contact>>,
  next: NextFunction
) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10')));
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await dbGet('SELECT COUNT(*) as total FROM contacts') as { total: number };
    const total = countResult.total;

    // Get paginated contacts
    const contacts = await dbAll(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    ) as Contact[];

    const totalPages = Math.ceil(total / limit);
    
    const paginatedResult: PaginatedResult<Contact> = {
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    res.json(paginatedResult);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    // Check if contact exists
    const contact = await dbGet('SELECT id FROM contacts WHERE id = ?', [id]);
    
    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    // Delete the contact
    await dbRun('DELETE FROM contacts WHERE id = ?', [id]);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};