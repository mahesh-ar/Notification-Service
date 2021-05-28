import * as mongoose from 'mongoose'
import config from '../../config/config'
import { Logger } from './logger'

export default class Database {
    public static connect(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Inside Database connect')
                const mongoUrl = config.MONGODB_CONNECTION_STRING
                await mongoose.connect(mongoUrl, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    bufferCommands: false,
                    bufferMaxEntries: 0
                })
                if (process.env.NODE_ENV === 'local') mongoose.set('debug', true)
                Logger.debug('Connect to MongoDB Sucessfully.')
                resolve(true)
            } catch (err) {
                Logger.error(`MongoDB connection error.${err}`)
                reject(err)
            }
        })
    }
}
