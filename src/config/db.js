require('./config');

module.exports = {
    "database" : `${global.gConfig.MONGODB_URI}/${global.gConfig.database}`
}