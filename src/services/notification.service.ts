import { Logger } from '../util/logger'
import { NOTIFICATION_TYPE } from '../constants/constants'
import EmailService from './email.service'

export default class NotificationService {

  public static processNotification = async (request: any) => {
    Logger.info('Inside processNotification function')
    return new Promise(async (resolve, reject) => {
      try {
         switch (request.notificationType) {
           case NOTIFICATION_TYPE.EMAIL:
             Logger.debug(`Executing Email service case: ${request.userId}`)
             await EmailService.processEmail(request.userId)
             resolve('Email sent successfully')
             break
           default:
             const err = 'Notification Request does not match'
             Logger.debug(err)
             resolve(err)
             break
         }
      } catch (error) {
        reject(error)
      }
    })
  }

}
