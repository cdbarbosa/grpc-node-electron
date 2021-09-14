const path = require('path')
const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader')


const microDef = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'micro.proto'), {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

const micro = grpc.loadPackageDefinition(microDef)

module.exports = new micro.UserService('localhost:3334', grpc.credentials.createInsecure())

