/**
 * This method returns the server config.
 * By default, it returns the Environment Variables.
 */
const keys = {
  secretOrKey: "sandbox-sq0idb-pb7e960ViJFaVbSLGkJDMQ"
}
const getConfig = () => {
  return process.env;
}
module.exports = {
  getConfig,
  keys,
}


