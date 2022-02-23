import mongoose from 'mongoose';
let mongo: mongoose.Mongoose;
const local = 'mongodb+srv://admin:admin@cluster0.h2efj.mongodb.net/chapapp';
// const local = 'mongodb://localhost:27017/test1';
const connect = async () => {
    try {
        mongo = await mongoose.connect(process.env.DB || local);        
        console.log('Connection succesful');

    } catch (error) {
        console.log('Connection filed');
    }

    return mongoose;
}

const desconnect = async() => {
   if(mongo) return await mongo.disconnect();
}



export default { connect, desconnect };