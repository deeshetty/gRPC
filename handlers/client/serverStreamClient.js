module.exports = (client) => {
    const serverStream = client.sayHelloServerStream({ name: 'Deepthi' });
    serverStream.on('data', (response) => {
        console.log('Server Stream Response:', response.message);
    });
    serverStream.on('end', () => {
        console.log('Server Stream ended');
    });
    serverStream.on('error', (err) => {
        console.error('Server Stream Error:', err);
    });
};