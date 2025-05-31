// let grpc = require('@grpc/grpc-js');
// let protoLoader = require('@grpc/proto-loader');

// let protoPath = require('path').join(__dirname, '../protos/hello.proto');

// let packageDefinition = protoLoader.loadSync(
//     protoPath, {
//         keepCase: true,
//         longs: String,
//         enums: String,
//         defaults: true,
//         oneofs: true
//     }
// )

// let helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// function sayHello(call, callback) {
//     console.log('Received request:', call.request);
//     callback(null, { message: 'Hello ' + call.request.name });
// }

// function sayHelloServerStream(call) {
//     console.log('Received request:', call.request);
//     let name = call.request.name;
//     for(let i = 0; i < 5; i++) {
//         console.log(`Hello ${name} - message ${i + 1}`);
//         call.write({ message: `Hello ${name} - message ${i + 1}` });
//     }
//     call.end()
// }

// function sayHelloClientStream(call, callback) {
//     let names = [];

//     call.on('data', function(request) {
//         console.log('Received request:', request);
//         if(request.name) {
//             names.push(request.name);
//         }
//     })

//     call.on('end', () => {
//         let message = `Hello ${names.join(', ')}`;
//         console.log('Sending response:', message);
//         callback(null, { message: message });
//     })
// }

// function sayHelloBidirectional(call) {
//     console.log('Bidirectional streaming started');
    
//     call.on('data', (request) => {
//         console.log('Received request:', request);
//         if(request.name) {
//             let response = { message: `Hello ${request.name}` };
//             console.log('Sending response:', response);
//             call.write(response);
//         }
//     });

//     call.on('end', () => {
//         console.log('Bidirectional streaming ended');
//         call.end();
//     });
// }

// function main() {
//     let server = new grpc.Server()
//     server.addService(helloProto.HelloService.service, {
//         sayHello: sayHello,
//         sayHelloServerStream: sayHelloServerStream,
//         sayHelloClientStream: sayHelloClientStream,
//         sayHelloBidirectional: sayHelloBidirectional
//     })
    
//     server.bindAsync('localhost:5002', grpc.ServerCredentials.createInsecure(), (error, port) => {
//         if (error) {
//             console.error('Error binding server:', error);
//             return;
//         }
//         console.log(`Server running at http://localhost:${port}`);
//         server.start();
//     });
// }

// main();

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