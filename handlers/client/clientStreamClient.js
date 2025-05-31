module.exports = (client) => {
    const clientStream = client.sayHelloClientStream((error, response) => {
        if (error) {
            console.error('Client Stream Error:', error);
        } else {
            console.log('Client Stream Response:', response.message);
        }
    });
    clientStream.write({ name: 'Deepthi' });
    clientStream.write({ name: 'S' });
    clientStream.write({ name: 'Shetty' });
    clientStream.end();
};