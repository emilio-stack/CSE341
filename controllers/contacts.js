const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  /**
   * #swagger.description = 'Get all contacts'
   */
  const result = await mongodb.getDb().db('personal2').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  /**
   * #swagger.description = 'Get single contact by id'
   */
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('personal2')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  /**
   * #swagger.description = 'Create a new contact'
   */
  // first extract the contact from the request
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }

  // send the contact to the db
  const response = await mongodb.getDb().db('personal2').collection('contacts').insertOne(newContact);

  // now check the result and return response accordingly
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "An error occured while creating the contact")
  }
};

const updateContact = async (req, res) => {
  /**
   * #swagger.description = 'Update contact by ID'
   */
  // first get the id of the contact to update
  const contactId = new ObjectId(req.params.id);

  // create the updated contact from the request
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  // now push the updated contact to the db at the specified id
  const response = await mongodb.getDb().db('personal2').collection('contacts').replaceOne({ _id: contactId }, updatedContact);
  
  // check the response
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  /**
   * #swagger.description = 'Delete contact by ID'
   */
  // first get the id of the contact to delete
  const contactId = new ObjectId(req.params.id);

  // delete the contact from the db
  const response = await mongodb.getDb().db('personal2').collection('contacts').deleteOne({_id: contactId}, true);

  // check the respoonse
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send()
  } else {
    res.status(500).json(response.error || "An error occured while deleting the contact");
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
