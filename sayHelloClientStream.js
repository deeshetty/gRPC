module.exports = (call, callback) => {
    let names = [];

    call.on('data', (request) => {
        console.log('Received request:', request);
        if (request.name) {
            names.push(request.name);
        }
    })

    call.on('end', () => {
        let message = `Hello ${names.join(', ')}`;
        console.log('Sending response:', message);
        callback(null, { message: message });
    })
}