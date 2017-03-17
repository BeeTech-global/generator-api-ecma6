
function throwMissingParameter(parameter) {
  const err = new Error(`Missing ${parameter} parameter`);
  throw err;
}

module.exports = throwMissingParameter;
