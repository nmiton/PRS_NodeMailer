require('dotenv').config();  
const express = require("express")
const nodeMail = require("nodemailer")
const path = require("path")
const router = require('./router')
const port = 3000
// console.logsprocess.env.REACT_APP_ACCOUNT_GMAIL)

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")))

async function mainMail(user_name, user_email, user_telephone, user_message) {
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
        subject: "Vous avez un nouveau message reçu depuis le formulaire de contact HôtenB.",
        html: 
        `
        <p>Message de la part de : ${user_name}</p>
        <p>Coordonnées :</p>
        <p>Téléphone : ${user_telephone}</p>
        <p>Email : ${user_email}</p>
        <p>Message :</p>
        <p>${user_message}</p>
        `,
    };
    try {
        await transporter.sendMail(mailOption)
        return Promise.resolve("Email envoyé!")
    } catch (error) {
        return Promise.reject(error)
    }
}

app.use('/', router);

app.get('/contact', function(req, res){
    res.sendFile(__dirname+'/public/contact.html',{message:"message"})
    console.log("message")
})

app.post('/contact', async (req, res, next) => {
    const {user_name, user_email, user_telephone, user_message} = req.body
    try {
        await mainMail(user_name, user_email, user_telephone, user_message)
        res.status(200).send("Email correctement envoyé!")
    } catch (error) {
        res.send("L'email n'a pas pu être envoyé, veuillez réessayer ultérieurement.")
    }
});

app.listen(port, function (err) {
    if(err){
        console.log("Erreur lors du démarrage du serveur!")
    }
    else{
        console.log("Le serveur a bien démarré sur le port n°"+port)
    }
})