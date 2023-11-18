// Makes the rest of the code independent of the sql library adapter
const adapter = require('./mysql-adapter')
exports.module = adapter
