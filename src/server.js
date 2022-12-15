const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000
const userCollection1 = require('./userdatabase/userdata');
require("./userdatabase/connection");
const app = express();
const bcrypt = require('bcrypt');

app.use(
    bodyparser.urlencoded({
        extended:true,
    })
)

app.use(express.json())

let mainfolder = path.join(__dirname,"../");
app.use(express.static(mainfolder))

const hashedpassword = async (password) =>{
    const hashkey = await bcrypt.hash(password,12);
    return hashkey
}

app.get('/',(req,res)=>{
    res.send('home page');
    // console.log(__dirname)
    // console.log(mainfolder)
})

app.get('/register',(req,res)=>{
    res.sendFile(mainfolder+"/index.html");
})

app.post("/register",(req,res)=>{
    // console.log(req.body.fullname);
    let reqUserdata = new userCollection1(req.body);
    // console.log(reqUserdata)
    if(reqUserdata.password == reqUserdata.confirmpassword){
        reqUserdata.save();
        res.send("registration successful")
    }else{
        res.send("passwords do not match");
    }
})

app.get('/login',(req,res)=>{
    res.sendFile(mainfolder+"/login.html")
})

app.post("/login", async(req,res)=>{
    let usermail = req.body.email;
    let userpassword = req.body.password;

    // console.log(usermail, '\n',userpassword);

    let mykey_password = hashedpassword(userpassword);
    console.log(mykey_password);

    let reqUserdata = await userCollection1.findOne({email:usermail});
    if(reqUserdata != null){
        const bcryptPasswordMatch = await bcrypt.compare(userpassword, reqUserdata.password)
        // console.log(bcryptPasswordMatch)
        if(bcryptPasswordMatch == true){
            res.send('Successfully logged in')
        }else{
            res.send("incorrect password")
        }
    }else{
        res.send("Email doesn't exist");
    }
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})