import * as nodemailer from 'nodemailer'
import config from '../../config/config';
import NotificationDao from '../dao/notification.dao';
import { Logger } from '../util/logger';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.USER_ID,
      pass: config.SECRET
    }
  });

export default class EmailService {
    public static processEmail = async (userId?: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Inside processEmail')
                const query: any = {}
                if (userId ) {
                    query.userId = userId
                }
                const users = await NotificationDao.getUsers(query)
                Logger.debug(' Users being process for email notification', null, null, users)
                for (let index = 0; index < users.length; index = index + 1) {
                    await EmailService.sendEmail(users[index])
                }
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    
    public static sendEmail = async (user: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.info('Inside sendEmail', null, null, user)
                const mailOptions = {
                    from: config.USER_ID,
                    to: user.email,
                    subject: 'Test subject 2',
                    text: 'Test email! 2'
                  }
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        Logger.error(' Error in sendEmail ', error, null, mailOptions)
                        resolve(error)
                    }else{
                        console.log("Message sent: " + response.message);
                        resolve('Email Sent')
                    }
                })
            } catch (error) {
                Logger.error(' Error in sendEmail ', error, null, user)
                reject(error)
            }
        })
    }
}