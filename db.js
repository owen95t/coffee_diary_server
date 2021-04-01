//TODO: Setup Mongoose DB online
const mongoose = require('mongoose');
const uri = "mongodb+srv://owen-admin:2391559Pongwut@cluster0.8fous.mongodb.net/coffee_diary_db?retryWrites=true&w=majority"

const connectDB = async () => {
    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => {
            console.log('MongoDB Atlas connected')
        }).catch(e => {
            console.log(e)
        })
    }catch (e) {
        console.log(e)
    }
}

module.exports = connectDB

