const dotenv = require('dotenv')
dotenv.config()

const _PORT = process.env.PORT

const _MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
const _ERROR_SOURCE = 'Notification Service'
const USER_ID = process.env.userid
const SECRET = process.env.secret

export default {
    USER_ID,
    SECRET,
    PORT: _PORT,
    MONGODB_CONNECTION_STRING: _MONGODB_CONNECTION_STRING,
    ERROR_SOURCE: _ERROR_SOURCE
}
