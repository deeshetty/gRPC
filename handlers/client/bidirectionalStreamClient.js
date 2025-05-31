module.exports = (client) => {
    const bidiStream = client.sayHelloBidirectional();
    bidiStream.on('data', (response) => {
        console.log('Bidirectional Stream Response:', response.message);
    });
    bidiStream.on('end', () => {
        console.log('Bidirectional Stream ended');
    });
    bidiStream.write({ name: 'Deepthi' });
    bidiStream.write({ name: 'S' });
    bidiStream.write({ name: 'Shetty' });
    bidiStream.end();
};