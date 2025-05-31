const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protoPath = path.join(__dirname, './protos/hello.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

const client = new helloProto.HelloService('localhost:5002', grpc.credentials.createInsecure());

// Import and run each client module
require('./handlers/client/unaryClient')(client);
require('./handlers/client/serverStreamClient')(client);
require('./handlers/client/clientStreamClient')(client);
require('./handlers/client/bidirectionalStreamClient')(client);