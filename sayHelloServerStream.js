module.exports = (call) => {
    console.log('Received request:', call.request);
    let name = call.request.name;
    
    for(let i = 0; i < 5; i++) {
        console.log(`Hello ${name} - message ${i + 1}`);
        call.write({ message: `Hello ${name} - message ${i + 1}` });
    }
    
    call.end();
}