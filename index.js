const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  console.log("Action:", action);
  switch (action) {
    case "list":
      listContacts().then((contacts) => {
        console.log("Contacts:", contacts);
      });
      break;

    case "get":
      getContactById(id).then((contact) => {
        console.log(`Contact with ID ${id}:`, contact);
      });
      break;

    case "add":
      addContact(name, email, phone).then((addedContact) => {
        console.log("Added contact:", addedContact);
      });
      break;

    case "remove":
      removeContact(id).then((removedContact) => {
        console.log("Removed contact:", removedContact);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
