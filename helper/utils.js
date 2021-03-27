const formatNull = (variable) => {
  if (
    variable === '' ||
    variable === undefined ||
    variable === null ||
    variable === 'null' ||
    variable === 'NULL'
  ) {
    return null;
  }

  return variable;
};

module.exports = {formatNull};
