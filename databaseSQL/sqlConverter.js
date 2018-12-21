exports.convertObjectToSQL = function(tableName, objectToConvert, skipID) {
  let toReturn = "INSERT INTO " + tableName + "(";
  let tableNames = "";
  let tableValues = "";
  let sqlTablesConvert = Object.keys(objectToConvert);
  let sqlValulesConvert = Object.values(objectToConvert);

  for (let i = 0; i < sqlTablesConvert.length; i++) {
    //let toReturn = "";
    if (skipID == true && sqlTablesConvert[i] == "id") {
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
      i + 1 < sqlValulesConvert.length &&
      typeof sqlValulesConvert[i + 1] != "object"
    ) {
      tableValues += ",";
      tableNames += ",";
    }
    //console.log( sqlValules[i] + '"');
  }
  toReturn += tableNames + ") VALUES (" + tableValues + ");";
  //console.log(toReturn);
  return toReturn;
};
