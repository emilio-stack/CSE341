const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// read all
router.get('/', contactsController.getAll);

// read by id
router.get('/:id', contactsController.getSingle);

// create
router.post('/', contactsController.createContact);

// update by ID
router.put('/:id', contactsController.updateContact);

// delete by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
