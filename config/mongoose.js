//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db',{useNewUrlParser: true,useUnifiedTopology: true});
//describe the connection (to check if its sucess)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));
// up and running then print on messgae
db.once('open',function(){
    console.log('succesfully connected to database');
});

