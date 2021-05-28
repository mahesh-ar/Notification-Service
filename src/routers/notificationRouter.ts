import * as express from 'express'
import NotificationController from '../controllers/notification.controller'
/**
 * Router class which handles all the routes related to notification
 * @since 1.0
 * @author Mahesh A R
 */
export default class NotificationRouter {

  public expressRouter = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.expressRouter.post(`/notification`, NotificationController.validateNotificationRequest, NotificationController.requestNotification)
  }
}
