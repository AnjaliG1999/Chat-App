// node server which will handle socket io connections

const io = require('socket.io')(8000, {
    cors: {
        origin: '*'
    }
})   // initialize io socket at port 8000

const users = {}

// io server listens to incoming events
io.on('connection', socket => {     // on a connection, run the arrow function
    // a particular connection handled
    socket.on('new-user-joined', name => {     // custom event new-user-joined
        // whenever event fired, set name in use
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })  
    
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', () => {
        const user = users[socket.id]
        delete users[socket.id]
        socket.broadcast.emit('user-disconnect', {name: user, users: users})      
    })
})