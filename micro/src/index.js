const path = require('path')
const grpc = require('grpc')
require('./database')
const implementation = require('./implementation')

const protoLoader = require('@grpc/proto-loader')


const packageDefinition = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'message.proto'), {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

const proto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(proto.UserService.service, implementation)
server.bind('0.0.0.0:3334', grpc.ServerCredentials.createInsecure())
server.start()