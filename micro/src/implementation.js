const User = require('./schemas/User')

module.exports = {
    async getAllUsers (call, callback) {

        const users = await User.find({})
        return callback(null, {user: [...users]})
    },
    async registerUser (call, callback) {
        const { name, email, password } = call.request
        
        const user = await User.create({ name, email, password })

        return callback(null,  { user })
    }
}