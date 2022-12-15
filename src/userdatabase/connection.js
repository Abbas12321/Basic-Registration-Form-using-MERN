const mongoose = require('mongoose');
const userCollection1 = require('./userdata');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://0.0.0.0:27017/MyUserData',{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Mongoose connection successful')
})
.catch((err)=>{
    console.log(err)
});