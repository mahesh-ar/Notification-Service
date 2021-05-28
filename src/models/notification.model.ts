import { Schema, model, Document } from 'mongoose'

const restaurantSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String }
})

export const userModel = model('users', restaurantSchema, 'users')
