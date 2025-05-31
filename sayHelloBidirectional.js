module.exports = (call) => {
    console.log('Bidirectional streaming started');
    call.on('data', (request) => {
        console.log('Received request:', request);
        if (request.name) {
            const response = { message: `Hello ${request.name}` };
            console.log('Sending response:', response);
            call.write(response);
        }
    });
    call.on('end', () => {
        console.log('Bidirectional streaming ended');
        call.end();
    });
};