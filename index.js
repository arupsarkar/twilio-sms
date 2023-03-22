const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


app.get("/sms", (req, res) => {
    console.log(process.env.TWILIO_ACCOUNT_SID);
    console.log(process.env.TWILIO_AUTH_TOKEN);
    console.log(process.env.TWILIO_PHONE_NUMBER);
    const currentDateTime = moment().format("MMMM Do YYYY HH:mm:ss a");
    
    client.messages
        .create({
            body: `${currentDateTime} Good News, there is a 15% discount on all products this week`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: "+16462697876"
        })
        .then(message => {
            console.log(message.sid)
            res.send(message.sid);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            console.log("Done");
        });





});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
