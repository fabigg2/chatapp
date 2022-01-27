import mongoose from 'mongoose';
const local = 'mongodb://localhost:27017/test1';
const connect = () => {
    mongoose.connect(process.env.DB || local);

    let { connection: db } = mongoose;

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log('Conection succesful');
    })

    return mongoose;
}

const desconnect = ()=>{
    mongoose.disconnect()
}



export default {connect, desconnect};