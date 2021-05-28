import { Logger } from '../util/logger'
import { userModel } from '../models/notification.model'

export default class NotificationDao {

   public static getUsers = (query): Promise<any[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const users: any = await userModel.find(query).exec()
                Logger.info(`Response from getUsers`, null, null, users)
                resolve(users)
            } catch (error) {
                Logger.error('Error while inserting address', error, null, null)
                reject(error)
            }
        })
    }
}
