# Node.js gRPC Streaming Examples

This project demonstrates all four types of gRPC communication in Node.js:

- **Unary RPC**
- **Server Streaming RPC**
- **Client Streaming RPC**
- **Bidirectional Streaming RPC**

## Features

- Modular handler structure for both server and client
- Follows SOLID principles and Node.js best practices
- Easy to extend and maintain

## Directory Structure

```
.
├── client.js
├── server.js
├── package.json
├── .gitignore
├── README.md
├── protos/
│   └── hello.proto
├── handlers/
│   ├── client/
│   │   ├── unaryClient.js
│   │   ├── serverStreamClient.js
│   │   ├── clientStreamClient.js
│   │   └── bidirectionalStreamClient.js
│   └── server/
│       ├── sayHello.js
│       ├── sayHelloServerStream.js
│       ├── sayHelloClientStream.js
│       └── sayHelloBidirectional.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
npm install
```

### Running the Server

```sh
node server.js
```

### Running the Client

```sh
node client.js
```

## Proto File

See [`protos/hello.proto`](./protos/hello.proto) for service and message definitions.

## How It Works

- **Server**: Implements all four gRPC streaming types using modular handlers.
- **Client**: Demonstrates how to call each RPC type, also using modular handlers.