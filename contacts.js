const fs = require("fs");
const { promises: fsPromises } = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) {
      return null;
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return removedContact;
  } catch (error) {
    console.error("Error removing contact:", error);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
