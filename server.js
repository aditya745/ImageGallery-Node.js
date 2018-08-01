const http = require('http');
const express = require("express");
const app = express();
const fs = require("fs");
const os = require("os");
const multer = require("multer");
const bodyParser = require("body-parser");
const {data }= require("./data.js");
const upload = require("express-fileupload");
app.use(upload());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');


//const content = fs.readFileSync("data.json");
// console.log("this is the data " + data[1])
// console.log("this is the data " + data[1].firstName,)
// console.log("this is the data " + data.length);


app.get("/",(req,res)=>{
  res.render("home",{data});

});

app.post("/addStudent",(request,response)=>{
  // const data =   {
  //     _id:3,
  //     name:"jaya",
  //     age:29,
  //     country:"India"
  //
  // }
  // students.push(data);

  if(!request.files)
    return response.status(400).send('No files were uploaded');
  let studentImage = request.files.studentImage;

  studentImage.mv(__dirname + '/assets/images/' + studentImage.name, function(err){
    if (err)
    return response.status(500).send(err);
      //response.send('File uploaded!');

  });
  const student = request.body;
  student.src = studentImage.name;

  const skillsArray = student.skills.split(",");
  student.skills = skillsArray;
  data.push(student);

    return response.redirect("/");
  //response.render('home');
});
app.get("/addStudent",(req,res)=>{
  res.render("addStudent");
});

app.get("/studentDetails/:lastName",(req,res)=>{
  const lastName = req.params.lastName;
  let flag = false;
  for(let i = 0; i < data.length; i++){
    if(data[i].lastName == lastName){
      flag=true;
      res.render("studentDetails" , data[i]);
    }
  }
  if(!flag){
    res.send('Not Found')
  }


});

app.listen(8000,()=>{
  console.log("listening at 8000");
})
