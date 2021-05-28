import { Logger } from './../util/logger';
import * as express from 'express'
import NotificationService from '../services/notification.service'
import * as joi from 'joi'
import { NOTIFICATION_TYPE } from '../constants/constants'

export default class NotificationController {

  public static validateNotificationRequest = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      Logger.info(' Inside validateNotificationRequest')
      const schema = joi.object().keys({
        userId: joi.string().optional(),
        notificationType: joi.string().valid([NOTIFICATION_TYPE.EMAIL]).required()
      }).unknown()
      const { error } = joi.validate(request.body, schema, { abortEarly: false })
      if (error) throw error
      next()
    } catch (err) {
      Logger.error(' Error in validateNotificationRequest', err, null, request.body)
      response.status(err.statusCode || 500).send(err)
    }
  }

  public static requestNotification = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      Logger.info('Inside requestNotification ')
      const result = await NotificationService.processNotification(request.body)
      response.json(result)
    } catch (err) {
      Logger.error('Error in requestNotification', err, null, request.body)
      response.status(err.statusCode || 500).send(err)
    }
  }

}
