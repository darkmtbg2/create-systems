const itSystemForDatabase = require("./itSystemForDatabase.json");
const itSystemRoleForDatabase = require("./itSystemRoleForDatabase.json");
const itSystemUserRoleForDatabase = require("./itSystemUserRoleForDatabase.json");
const faker = require("faker");
const uuid = require("uuid/v4");

let itSystemNumber = 1;
let itSystemRoleNumber = 1;
let itSystemUserRoleNumber = 1;

exports.createRandomAmountOfItSystems = function(
  amountOfItsystemsToCreate,
  amountOfItSystemRoles,
  amountOfUserRoles
) {
  return this.createMultipleItSystemsRandomized(
    amountOfItsystemsToCreate,
    undefined,
    amountOfItSystemRoles,
    undefined,
    amountOfUserRoles,
    undefined
  );
};

//const jsonCreator = new jsonCreator({});
exports.createMultipleItSystemsRandomized = function(
  amountOfItsystemsToCreate,
  randomAmountItSystemMax,
  amountOfItSystemRoles,
  amountOfItSystemRolesMax,
  amountOfUserRoles,
  amountOfUserRolesMax
) {
  if (amountOfItsystemsToCreate == undefined) {
    amountOfItsystemsToCreate = 5;
  }
  if (randomAmountItSystemMax != undefined) {
    amountOfItsystemsToCreate =
      amountOfItsystemsToCreate +
      Math.floor(
        Math.random() * (randomAmountItSystemMax - amountOfItsystemsToCreate)
      );
  }
  const itSystemsList = { itSystems: new Array() };
  for (let i = 0; i < amountOfItsystemsToCreate; i++) {
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
  if (amountOfItSystemRoles == undefined) {
    amountOfItSystemRoles = 5;
  }
  if (
    amountOfItSystemRolesMax != undefined &&
    amountOfItSystemRoles < amountOfItSystemRolesMax
  ) {
    amountOfItSystemRoles =
      amountOfItSystemRoles +
      Math.floor(
        Math.random() * (amountOfItSystemRolesMax - amountOfItSystemRoles)
      );
  }

  objectKeys.forEach(key => {
    if (key === "id") {
      toReturn[key] = itSystemNumber;
      itSystemNumber++;
    } else if (key === "name") {
      toReturn[key] = faker.company.companyName();
    } else if (key === "identifier") {
      toReturn[key] =
        "https://test.idconnect.dk:8090/itsystem/" + (itSystemNumber - 1);
    } else if (key === "system_Type") {
      toReturn[key] = "SAML";
    } else if (key === "notes") {
      toReturn[key] = "Location " + faker.address.city();
    } else if (key === "uuid") {
      toReturn[key] = uuid();
    } else if (key === "system_Roles") {
      toReturn[key] = this.createMultipleItSystemRoles(
        itSystemNumber - 1,
        amountOfItSystemRoles,
        amountOfUserRoles,
        amountOfUserRolesMax
      );
      //toReturn[key] = "DONE";
    } else if (key === "paused") {
      toReturn[key] = false;
    } else {
      toReturn[key] = "TODO";
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
  if (parentSystem == undefined) {
    parentSystem = 0;
  }

  objectKeys.forEach(key => {
    if (key === "id") {
      toReturn[key] = itSystemRoleNumber;
      itSystemRoleNumber++;
    } else if (key === "name") {
      toReturn[key] = faker.commerce.department();
    } else if (key === "identifier") {
      toReturn[key] =
        "https://test.idconnect.dk:8090/itsystemrole/" +
        (itSystemRoleNumber - 1);
    } else if (key === "description") {
      toReturn[key] = faker.lorem.word() + " " + faker.lorem.word();
    } else if (key === "it_System_Id") {
      toReturn[key] = parentSystem;
    } else if (key === "role_Type") {
      toReturn[key] = "BOTH";
    } else if (key === "uuid") {
      toReturn[key] = uuid();
    } else if (key === "user_Roles") {
      toReturn[key] = this.createMultipleUserRoles(
        itSystemNumber - 1,
        amountOfUserRoles,
        amountOfUserRolesMax
      );
      //toReturn[key] = "TODO user_roles";
    } else {
      toReturn[key] = "TODO";
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

  if (amountOfUserRoles == undefined) {
    amountOfUserRoles = 5;
  }
  if (
    amountOfUserRolesMax != undefined &&
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
  if (parentSystem == undefined) {
    parentSystem = 0;
  }
  objectKeys.forEach(key => {
    if (key === "id") {
      toReturn[key] = itSystemUserRoleNumber;
      itSystemUserRoleNumber++;
    } else if (key === "name") {
      toReturn[key] = faker.lorem.word();
    } else if (key === "identifier") {
      toReturn[key] =
        "https://test.idconnect.dk:8090/ituserrole/" +
        (itSystemUserRoleNumber - 1);
    } else if (key === "description") {
      toReturn[key] = faker.lorem.words(4);
    } else if (key === "it_System_Id") {
      toReturn[key] = parentSystem;
    } else if (key === "user_only") {
      toReturn[key] = true;
    } else if (key === "ou_inherit_allowed") {
      toReturn[key] = false;
    } else if (key === "uuid") {
      toReturn[key] = uuid();
    } else if (key === "delegated_from_cvr") {
      toReturn[key] = "";
    } else {
      toReturn[key] = "TODO";
    }
  });
  return toReturn;
};

//Resets Counters
exports.resetAllCounters = function() {
  this.resetItSystemCounter();
  this.resetItSystemRoleCounter();
  this.resetUserRoleCounter();
};
exports.resetItSystemCounter = function() {
  this.itSystemNumber = 1;
};
exports.resetItSystemRoleCounter = function() {
  this.itSystemRoleNumber = 1;
};
exports.resetUserRoleCounter = function() {
  this.itSystemUserRoleNumber = 1;
};
