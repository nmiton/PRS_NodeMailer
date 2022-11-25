require('dotenv').config();
const express = require("express");
const nodeMail = require("nodemailer");
const path = require("path");

console.log(process.env.REACT_APP_ACCOUNT_GMAIL)

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
    const transporter = nodeMail.createTransport({
        service: "gmail",
        auth: {
        user: process.env.REACT_APP_ACCOUNT_GMAIL,
        pass: process.env.REACT_APP_SECRET_CODE_GMAIL,
        },
    });
    const mailOption = {
        from: 'from',
        to: process.env.REACT_APP_ACCOUNT_GMAIL,
        subject: subject,
        html: `You got a message from 
        Email : ${email}
        Name: ${name}
        Message: ${message}`,
    };
    try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
        return Promise.reject(error);
    }
}

app.get("/", (req, res) => {
    res.render(index.html);
    // res.send('hello world');
});

app.get("/contact", (req, res) => {
    res.render(contact.html);
});

app.post("/contact", async (req, res, next) => {
    const { yourname, youremail, yoursubject, yourmessage } = req.body;
    try {
        await mainMail(yourname, youremail, yoursubject, yourmessage);
        
        res.send("Message Successfully Sent!");
    } catch (error) {
        res.send("Message Could not be Sent");
    }
});

app.listen(3000, () => console.log("Server is running!"));
