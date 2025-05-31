module.exports = (client) => {
    client.sayHello({ name: 'DS' }, (err, response) => {
        if (err) {
            console.error('Unary Error:', err);
        } else {
            console.log('Unary Greeting:', response.message);
        }
    });
};