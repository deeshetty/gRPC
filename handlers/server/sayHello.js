module.exports = (call, callback) => {
    console.log('Received request:', call.request);
    callback(null, { message: 'Hello ' + call.request.name });
}