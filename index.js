//The Required Packages from outside the project
const fs = require("fs");

const jsonCreator = require("./DatabaseJson/jsonCreatorForDatabase.js");
const sqlConverter = require("./DatabaseSQL/sqlConverter.js");
const fileWriter = require("./FileWriter/fileWriter.js");

//console.log(jsonCreator.createMultipleItSystemRoles(15, 2));
const test = jsonCreator.createMultipleItSystemsRandomized(5, 15, 2, 10, 2, 10);
fileWriter.writeFileSync(
  "./out/systems",
  "json",
  JSON.stringify(test, null, 4)
);
//console.log(convertAllToSQL(test));
//fileWriter.writeFileSync("./out/insertToSql", "sql", convertAllToSQL(test));
fileWriter.writeFileSync(
  "./out/insertToSqlWithWhere",
  "sql",
  allConvertWithWhereStatments(test)
);
function convertAllToSQL(toConvert) {
  let sqlToReturn = "";
  sqlToReturn += "START TRANSACTION;\n";
  sqlToReturn += "SET autocommit = 0;\n";
  toConvert.itSystems.forEach(element => {
    sqlToReturn +=
      sqlConverter.convertObjectToSQL("it_systems", element) + "\n";
    //console.log(element);
    element.system_Roles.forEach(element => {
      sqlToReturn +=
        sqlConverter.convertObjectToSQL("system_roles", element) + "\n";
      let systemroleID = element.id;
      //console.log(element);
      element.user_Roles.forEach(element => {
        sqlToReturn +=
          sqlConverter.convertObjectToSQL("user_roles", element) + "\n";
        let userRolesID = element.id;
        sqlToReturn +=
          "INSERT INTO system_role_assignments(user_role_id,system_role_id) VALUES (" +
          userRolesID +
          "," +
          systemroleID +
          ");" +
          "\n";
        //console.log(element);
      });
    });
  });
  sqlToReturn += "COMMIT TRANSACTION;";
  return sqlToReturn;
}
function allConvertWithWhereStatments(itSystemsArray) {
  let sqlToReturn = "";
  itSystemsArray.itSystems.forEach(element => {
    let itSystemsUUID = element.uuid;
    let itSystemsID = element.id;
    sqlToReturn +=
      sqlConverter.convertObjectToSQL("it_systems", element, true) + "\n";
    element.system_Roles.forEach(element => {
      let systemRoleUuid = element.uuid;
      sqlToReturn +=
        convertObjectToSQLWithWhereStatement(
          "system_roles",
          element,
          true,
          itSystemsID,
          '(select id from it_systems where uuid = "' + itSystemsUUID + '")'
        ) + "\n";
      //let systemroleID = element.id;
      element.user_Roles.forEach(element => {
        let userRoleUuid = element.uuid;
        sqlToReturn +=
          convertObjectToSQLWithWhereStatement(
            "user_roles",
            element,
            true,
            itSystemsID,
            '(select id from it_systems where uuid = "' + itSystemsUUID + '")'
          ) + "\n";
        sqlToReturn += createBindingTable(systemRoleUuid, userRoleUuid) + "\n";
      });
    });
    //
  });
  console.log(sqlToReturn);
  return sqlToReturn;
}

function createBindingTable(systemroleuuid, userRolesuuid) {
  let sqlToReturn = "";
  sqlToReturn +=
    'INSERT INTO system_role_assignments(system_role_id,user_role_id) VALUES ((SELECT id FROM system_roles WHERE uuid = "' +
    systemroleuuid +
    '"),(SELECT id FROM user_roles WHERE uuid = "' +
    userRolesuuid +
    '"));';
  return sqlToReturn;
}

// //Functions
function convertObjectToSQLWithWhereStatement(
  tableName,
  objectToConvert,
  skipID,
  it_System_Id,
  selectStatment
) {
  let toReturn = "INSERT INTO " + tableName + "(";
  let tableNames = "";
  let tableValues = "";
  let sqlTablesConvert = Object.keys(objectToConvert);
  let sqlValulesConvert = Object.values(objectToConvert);
  skipID = true;
  for (let i = 0; i < sqlTablesConvert.length; i++) {
    //let toReturn = "";
    //console.log(sqlTablesConvert[i] + " ");
    if (skipID == true && sqlTablesConvert[i] == "id") {
    } else if (sqlTablesConvert[i].toLowerCase() == "it_system_id") {
      tableValues += selectStatment;
      tableNames += sqlTablesConvert[i];
    } else if (typeof sqlValulesConvert[i] == "string") {
      tableValues += '"' + sqlValulesConvert[i] + '"';
      tableNames += sqlTablesConvert[i];
    } else if (typeof sqlValulesConvert[i] == "number") {
      tableValues += sqlValulesConvert[i];
      tableNames += sqlTablesConvert[i];
    } else if (typeof sqlValulesConvert[i] == "boolean") {
      tableValues += sqlValulesConvert[i];
      tableNames += sqlTablesConvert[i];
    } else {
      //console.log(typeof sqlValulesConvert[i]);
    }
    if (skipID == true && sqlTablesConvert[i] == "id") {
    } else if (
      (i + 1 < sqlValulesConvert.length &&
        typeof sqlValulesConvert[i + 1] != "object") ||
      (i + 1 < sqlValulesConvert.length &&
        sqlValulesConvert[i] === "it_System_Id")
    ) {
      tableValues += ",";
      tableNames += ",";
    }
    //console.log( sqlValules[i] + '"');
  }
  toReturn += tableNames + ") VALUES (" + tableValues + ");";
  //console.log(toReturn);
  return toReturn;
}
