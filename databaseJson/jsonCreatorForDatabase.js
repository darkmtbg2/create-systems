const itSystemForDatabase = require("./itSystemForDatabase.json");
const itSystemRoleForDatabase = require("./itSystemRoleForDatabase.json");
const itSystemUserRoleForDatabase = require("./itSystemUserRoleForDatabase.json");
const faker = require("faker");
const uuid = require("uuid/v4");

let itSystemNumber = 1;
let itSystemRoleNumber = 1;
let itSystemUserRoleNumber = 1;

exports.createRandomAmountOfItSystems = function(
  amountOfItSystemsToCreate,
  amountOfItSystemRoles,
  amountOfUserRoles
) {
  return this.createMultipleItSystemsRandomized({
    amountOfItSystemsToCreate,
    amountOfItSystemRoles,
    amountOfUserRoles
  });
};

//const jsonCreator = new jsonCreator({});
exports.createMultipleItSystemsRandomized = function({
  amountOfItSystemsToCreate,
  amountOfItSystemsToCreateMax = 5,
  amountOfItSystemRoles,
  amountOfItSystemRolesMax = 5,
  amountOfUserRoles,
  amountOfUserRolesMax = 5
}) {
  if (amountOfItSystemsToCreate === undefined) {
    amountOfItSystemsToCreate = 5;
  }
  if (amountOfItSystemsToCreateMax !== undefined) {
    amountOfItSystemsToCreate =
      amountOfItSystemsToCreate +
      Math.floor(
        Math.random() *
          (amountOfItSystemsToCreateMax - amountOfItSystemsToCreate)
      );
  }
  const itSystemsList = { itSystems: new Array() };
  for (let i = 0; i < amountOfItSystemsToCreate; i++) {
    itSystemsList.itSystems[i] = this.createItSystem(
      amountOfItSystemRoles,
      amountOfItSystemRolesMax,
      amountOfUserRoles,
      amountOfUserRolesMax
    );
  }
  //this.resetAllCounters();
  return itSystemsList;
};

exports.createItSystem = function(
  amountOfItSystemRoles,
  amountOfItSystemRolesMax,
  amountOfUserRoles,
  amountOfUserRolesMax
) {
  let toReturn = { ...itSystemForDatabase };
  let objectKeys = Object.keys(toReturn);
  if (amountOfItSystemRoles === undefined) {
    amountOfItSystemRoles = 5;
  }
  if (
    amountOfItSystemRolesMax !== undefined &&
    amountOfItSystemRoles < amountOfItSystemRolesMax
  ) {
    amountOfItSystemRoles =
      amountOfItSystemRoles +
      Math.floor(
        Math.random() * (amountOfItSystemRolesMax - amountOfItSystemRoles)
      );
  }

  objectKeys.forEach(key => {
    switch (key) {
      case "id":
        toReturn[key] = itSystemNumber;
        itSystemNumber++;
        break;
      case "name":
        toReturn[key] = faker.company.companyName();
        break;
      case "identifier":
        toReturn[key] =
          "https://test.idconnect.dk:8090/itsystem/" + (itSystemNumber - 1);
        break;
      case "System_Type":
        toReturn[key] = "SAML";
        break;
      case "notes":
        toReturn[key] = "Location " + faker.address.city();
        break;
      case "uuid":
        toReturn[key] = uuid();
        break;
      case "system_Roles":
        toReturn[key] = this.createMultipleItSystemRoles(
          itSystemNumber - 1,
          amountOfItSystemRoles,
          amountOfUserRoles,
          amountOfUserRolesMax
        );
        break;
      case "paused":
        toReturn[key] = false;
        break;
      default:
        toReturn[key] = "TODO";
        break;
    }
  });
  return toReturn;
};

exports.createMultipleItSystemRoles = function(
  parentSystem,
  amountToCreate,
  amountOfUserRoles,
  amountOfUserRolesMax
) {
  const itSystemsList = new Array();
  for (let i = 0; i < amountToCreate; i++) {
    itSystemsList[i] = this.createSystemRoles(
      parentSystem,
      amountOfUserRoles,
      amountOfUserRolesMax
    );
  }
  //this.resetAllCounters();
  return itSystemsList;
};
exports.createSystemRoles = function(
  parentSystem,
  amountOfUserRoles,
  amountOfUserRolesMax
) {
  let toReturn = { ...itSystemRoleForDatabase };
  let objectKeys = Object.keys(toReturn);
  if (parentSystem === undefined) {
    parentSystem = 0;
  }

  objectKeys.forEach(key => {
    switch (key) {
      case "id":
        toReturn[key] = itSystemRoleNumber;
        itSystemRoleNumber++;
        break;
      case "name":
        toReturn[key] = faker.commerce.department();
        break;
      case "identifier":
        toReturn[key] =
          "https://test.idconnect.dk:8090/itsystemrole/" +
          (itSystemRoleNumber - 1);
        break;
      case "description":
        toReturn[key] = faker.lorem.word() + " " + faker.lorem.word();
        break;
      case "it_System_Id":
        toReturn[key] = parentSystem;
        break;
      case "role_Type":
        toReturn[key] = "BOTH";
        break;
      case "uuid":
        toReturn[key] = uuid();
        break;
      case "user_Roles":
        toReturn[key] = this.createMultipleUserRoles(
          itSystemNumber - 1,
          amountOfUserRoles,
          amountOfUserRolesMax
        );
        break;
      default:
        toReturn[key] = "TODO";
        break;
    }
  });
  return toReturn;
};

exports.createMultipleUserRoles = function(
  parentSystem,
  amountOfUserRoles,
  amountOfUserRolesMax
) {
  const userRoles = new Array();

  if (amountOfUserRoles === undefined) {
    amountOfUserRoles = 5;
  }
  if (
    amountOfUserRolesMax !== undefined &&
    amountOfUserRoles < amountOfUserRolesMax
  ) {
    amountOfUserRoles =
      amountOfUserRoles +
      Math.floor(Math.random() * (amountOfUserRolesMax - amountOfUserRoles));
  }
  for (let i = 0; i < amountOfUserRoles; i++) {
    userRoles[i] = this.createSystemUserRoles(parentSystem);
  }
  //this.resetAllCounters();
  return userRoles;
};

exports.createSystemUserRoles = function(parentSystem) {
  let toReturn = { ...itSystemUserRoleForDatabase };
  let objectKeys = Object.keys(toReturn);
  if (parentSystem === undefined) {
    parentSystem = 0;
  }
  objectKeys.forEach(key => {
    switch (key) {
      case "id":
        toReturn[key] = itSystemUserRoleNumber;
        itSystemUserRoleNumber++;
        break;
      case "name":
        toReturn[key] = faker.lorem.word();
        break;
      case "identifier":
        toReturn[key] =
          "https://test.idconnect.dk:8090/ituserrole/" +
          (itSystemUserRoleNumber - 1);
        break;
      case "description":
        toReturn[key] = faker.lorem.words(4);
        break;
      case "it_System_Id":
        toReturn[key] = parentSystem;
        break;
      case "user_only":
        toReturn[key] = true;
        break;
      case "ou_inherit_allowed":
        toReturn[key] = false;
        break;
      case "uuid":
        toReturn[key] = uuid();
        break;
      case "delegated_from_cvr":
        toReturn[key] = "";
        break;
      default:
        toReturn[key] = "TODO";
        break;
    }
  });
  return toReturn;
};

//Resets Counters
exports.resetAllCounters = function() {
  resetItSystemCounter();
  resetItSystemRoleCounter();
  resetUserRoleCounter();
};
resetItSystemCounter = function() {
  this.itSystemNumber = 1;
};
resetItSystemRoleCounter = function() {
  this.itSystemRoleNumber = 1;
};
resetUserRoleCounter = function() {
  this.itSystemUserRoleNumber = 1;
};
