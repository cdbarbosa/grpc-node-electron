const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String
})

UserSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) next()

    this.password = await bcrypt.hash(this.password, 8)
})

module.exports = mongoose.model('User', UserSchema)