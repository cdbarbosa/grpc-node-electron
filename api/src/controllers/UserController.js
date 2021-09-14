const microService = require('../proto')

class UserController {
    async index (req, res) {
        const response = await new Promise((resolve, reject) => {
            microService.getAllUsers({}, function (err, response ) {
                if (err) reject(err)
                else resolve(response)
            })
        })
        return res.json(response)
    }
    async store (req, res) {
        const { name, email, password } = req.body
        await microService.registerUser({
            name,
            email,
            password
        }, function (err, response) {
            if (err) console.log(err)
            else console.log(response)
        })

        return res.send('Created')
    }
}

module.exports = new UserController()