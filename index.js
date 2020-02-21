const express = require("express");
const path = require("path");
const port = 8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name:"ayush",
        phone:9534884954
    },
    {
        name:"daya",
        phone:7098638104
    }
]

app.get("/", function(req, res) {

    Contact.find({},function(err,contacts){
      if(err){
        console.log('error');
        return;
      }
      return res.render(home,{
        title:"Contact List",
        contact_list: contacts
      });
    })

})

app.post('/create-contact', (req, res) => {

  Contact.create({
    name:req.body.name,
    phone:req.body.phone
    
  }, function(err, newContact){
    if(err){
      console.log('error',err);
      return;
    }
    return  res.redirect('back');
  })
  
});


app.listen(port, function(err) {
  if (err) {
    console.log("error running in the server", err);
  }
  console.log("yup my express server is running on port ", port);
})


// for deleting a contact
app.get('/delete-conatct', (req, res) => {
    
  // get the id from query in  the url
    console.log(req.query);
    let id=req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
      if(err){
        console.log('error is deleting an object from databse');
        return;
      }
      return  res.redirect('back');
    })
    
  });




