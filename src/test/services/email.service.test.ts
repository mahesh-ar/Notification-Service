import { resolve } from 'url'
import config from '../../../config/config'
import NotificationDao from '../../dao/notification.dao'
import EmailService from '../../services/email.service'

const validEmail = 'fake@email.com'
const error = new Error('fake')
jest.mock('nodemailer', () => {
    return {
        createTransport: function () {
            return {
                sendMail: async function(mailOptions, callback) {
                    if(mailOptions.to === validEmail) {
                        callback(null, true)
                    } else {
                        callback(error, null)
                    }
                }
            }
        }
    }
  })

const mockUserData = {
    name: 'tester',
    email: 'test@test.com',
    phone: '1234567890'
}

describe('EmailService', () => {
    describe('processEmail', () => {
        it('Should process email for users', async () => {
            jest.spyOn(NotificationDao, 'getUsers').mockResolvedValue([mockUserData])
            jest.spyOn(EmailService, 'sendEmail').mockResolvedValue(true)
            const actual = await EmailService.processEmail('123')
            expect(actual).toBe(true)
        })
        it('Should throw error if unable to get user from db ', async () => {
            jest.spyOn(NotificationDao, 'getUsers').mockRejectedValue(error)
            await EmailService.processEmail('123')
            .catch((error) => {
                expect(error).toBeInstanceOf(Error)
            })
        })
    })

    describe('sendEmail', () => {
        it('Should send email if confiurations are valid', async () => {
            const user = JSON.parse(JSON.stringify(mockUserData))
            user.email = validEmail
            const actual = await EmailService.sendEmail(user)
            expect(actual).toBe('Email Sent')
        })
        it('Should throw error nodemailer configurations are invalid ', async () => {
            await EmailService.sendEmail(mockUserData)
            .catch((error) => {
                expect(error).toBeInstanceOf(Error)
            })
        })
    })
})