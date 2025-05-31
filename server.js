const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load proto
const protoPath = path.join(__dirname, './protos/hello.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// Import handlers
const sayHello = require('./handlers/server/sayHello');
const sayHelloClientStream = require('./handlers/server/sayHelloClientStream');
const sayHelloBidirectional = require('./handlers/server/sayHelloBidirectional');
const sayHelloServerStream = require('./handlers/server/sayHelloServerStream');

// Start server
function main() {
    const server = new grpc.Server();
    server.addService(helloProto.HelloService.service, {
        sayHello,
        sayHelloServerStream,
        sayHelloClientStream,
        sayHelloBidirectional
    });

    server.bindAsync('localhost:5002', grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error('Error binding server:', error);
            return;
        }
        console.log(`Server running at http://localhost:${port}`);
        server.start();
    });
}

main();