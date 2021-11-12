const nodemailer = require('nodemailer');
const {
    unlink
} = require('fs');

const applyController = {

    /**
     * Applying page : send notification mail for new job apply
     * @async
     * @param {userMail}
     * @param {firstName}
     * @param {lastName}
     * @param {phone}
     * @param {offerTitle}
     * @param {offerURL}
     * @param {message}
     * @param {file}
     * @returns {sendMail} - Mail sent
     * @throws {Error} - status 400 (bad request) : Mail not sent
     */
    sendApply: function (req, res) {
        // console.log('##### BODY', req.body);
        // console.log('##### FILES', req.file);
        
        // SMTP method using Gmail server to send e-mails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ldonodemailer@gmail.com',
                pass: process.env.MAIL_PASSWORD
            }
        });
        // Options to define mail sending parameters
        const mailOptions = {
            //userMail
            //firstName
            //lastName
            //phone
            //offerTitle -> send by default from front // example : {titre}
            //offerURL
            //message
            //file
            from: `"Email:" <${req.body.userMail}>`, // sender address
            to: 'ldonodemailer@gmail.com', // list of receivers
            subject: req.body.offerTitle, // Subject line
            html: `<div style="opacity: 0.9; background-repeat: no-repeat; border-radius: 20px; width: 80vw; height: 102vh; background-image: url('https://images.unsplash.com/photo-1476067897447-d0c5df27b5df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80'); box-sizing: border-box;">
    
            <div style="color: white; font-size: 1.9em; font-weight: bold; padding: 2em 2em 1em;"> Vous avez reçu une candidature pour le poste de <span style="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px;">${req.body.offerTitle}</span> </div>
            
            <div style="margin: 20px;"><a href="${req.body.offerURL}" style="border: 1px solid rgba(64, 194, 211, 0.7); background-color: rgba(64, 194, 211, 0.7); color: white; font-size : 1.4em; font-weight: bold; text-align: center;border-radius: 5px; padding: 15px 5px; width:200px; display: inline-block;">Lien vers l'offre</a></div>
            
            <div style = "color:white; height: 165vh; width: 60vw; font-size: 1.5em;">
                
                <div style = "margin: 2em; font-weight: bold; font-size :1.2em; text-decoration: underline; color:white;"> Informations du candidat : </div>
                
                <div style = "margin: 2em;" ><span style ="font-weight: bold;">E-mail :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.userMail}</span></div>
                <div style = "margin: 2em;" ><span style ="font-weight: bold;">Nom :        </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.firstName}</span></div>
                <div style = "margin: 2em;" ><span style ="font-weight: bold;">Prénom :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.lastName}</span></div>
                <div style = "margin: 2em;" ><span style ="font-weight: bold;">Téléphone :  </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.phone}</span></div> <br>
                <div style = "margin: 2em;" ><span style ="font-weight: bold;">Message : <br> </span> <span style = "margin: 1em; line-height:2.3em;"">${req.body.message}</span></div>
        
                <div style = "margin: 2em; font-size:1.2em;">Vous trouverez le CV en pièce jointe </div>
            </div>
        </div>`, // plain text body
            attachments: [{
                filename: req.file.filename,
                path: req.file.path,
            }]
        };

        // Method sendMail of the transporter : send mail with parameters defined before
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error :', err)
                res.status(400).json({message : "Echec de l'envoi du mail"});
            } else {
                console.log('Email sent : ', info);
                unlink(req.files.path, (err) => {
                    if (err) throw err;
                    console.log(`The file ${req.file.path}  was deleted`);
                });
            }
        })

        res.json({
            message: 'Votre candidature a bien été envoyée'
        });
    }
};

module.exports = applyController;