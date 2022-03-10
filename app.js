//--------- Initial code for all program------
const express = require("express");  //install node.js
const bodyParser = require("body-parser");
const https = require("https"); //code to display response from server
const mailChimp = require("@mailchimp/mailchimp_marketing"); //requiring mailchimp API module
const app = express(); //assigning node module to a object
app.use(bodyParser.urlencoded({extended:true})); // code to get variables from the client
app.use(express.static("public")); //code to get css page to work

// ---------Initial code ends here----------

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html"); // sending request to server
});


//mailchimp API
mailChimp.setConfig({
    apiKey: "70195651f91775de6ff938ce5e71a24a-us14",
    server: "us14",
  });
  
 

app.post("/", function(req, res){       //function which fetches respond from server
    const fName = req.body.firstName;  
    const lName = req.body.lastName;
    const email = req.body.emailId;
    const listId = "680e4c7f4e"; // creating object with users data
   
    const subscribingUser = {
      firstName: fName,
      lastName: lName,
      email: email
    };
    
    async function run() {
    try {
      const response = await mailChimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } 
    catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
     
  };
    run();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(3000, function(){                                    
    console.log("Server is running on port 3000");     //function to set up server port, **mandatory code**
});

//API Key 70195651f91775de6ff938ce5e71a24a-us14
// list id 680e4c7f4e



