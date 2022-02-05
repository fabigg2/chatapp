const socketIO = io('/', {
    extraHeaders: {
        "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWY0MjgzYmRiYzEwNzE0MGQwNTNmNzEiLCJpYXQiOjE2NDMzOTU4OTgsImV4cCI6MTY0MzM5OTQ5OH0.Bzc4b3hvdd-vkM4Poy4tJKzWRIVB0Q0yYf094vmJ-c4"
    }
});

socketIO.on("disconnect", (reason) => {
    console.log('Connection closed',reason);
});

socketIO.on('exception', (exception)=>{
    console.log(exception);
});

socketIO.on('frineds-connected', (friends)=>{
    console.log(friends);
    socketIO.emit('new-message', ({uid: friends[0]._id, msg:'hello'}))
})

socketIO.on('new-message', (message)=>{
    console.log(message);
})