//jshint esversion:6

const ejs= require("ejs");
const bodyParser=require("body-parser");
const express =require("express");
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema= new mongoose.Schema({
    email:String,
    password:String
});



const secrets="thisisthesecrets";
userSchema.plugin(encrypt, {secret:secrets, encryptedFields: ["password"] });





const User=mongoose.model("User",userSchema);



app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    const newUser=new User({
        email: req.body.username,
        password:req.body.password
    });

    // newUser.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.render("secrets");
    //     }
    // });


    newUser.save().then(()=>{
        res.render("secrets");
    }).catch((err)=>{
        console.log(err);
    })

});


app.post("/login",function(req,res){
    const username=req.body.username;
    const password1=req.body.password;

    // User.findOne({email:username}, function(err,foundUser){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         if(foundUser){
    //             if(foundUser.password === password){
    //                 res.render("secrets");
    //             } else{
    //                 console.log("password is not correct.");
    //             }
    //         }
    //     }
    // });

    // User.find({email:username}.then(()=>{
        
    //         res.render("secrets");
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    
    // );
      
    

    });


app.listen(3000,function(){
    console.log("serber is running.");
});