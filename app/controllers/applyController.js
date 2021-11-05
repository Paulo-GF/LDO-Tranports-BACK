const nodemailer = require('nodemailer');
const {
    unlink
} = require('fs');

const applyController = {
    sendApply: function (req, res) {
        console.log('##### BODY', req.body);
        console.log('##### FILES', req.file);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ldonodemailer@gmail.com',
                pass: process.env.MAIL_PASSWORD
            }
        });

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
            html: `<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center;">
            <img src="https://images.unsplash.com/photo-1476067897447-d0c5df27b5df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" style="width:900px; opacity: 0.7; position: absolute; width:1000px;">
            
            <div style="color: white; font-size: 1.4em; font-weight: bold; position: relative; z-index: 2; width:800px; margin: 10px;"> Vous avez reçu une candidature pour le poste de <span style="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px;">${req.body.offerTitle}</span> </div>
            
            <div style="margin: 20px;"><a href="${req.body.offerURL}" style="border: 1px solid rgba(64, 194, 211, 0.7); background-color: rgba(64, 194, 211, 0.7); color: white; font-weight: bold; text-align: center;border-radius: 5px; position: relative; z-index: 2; padding: 15px 5px; width:200px; display: inline-block;">Lien vers l'offre</a></div>
            
            <div style = "margin-top:10px; color:white; position: relative; z-index: 2; display : flex; align-items: flex-start; flex-flow: wrap column; width:80%; height:65vh; justify-content: space-around;">
                <div style = "font-weight: bold; font-size :1.2em; text-decoration: underline; color:white;"> Informations du candidat : </div>
                
                <div ><span style ="font-weight: bold;">E-mail :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.userMail}</span></div>
                <div ><span style ="font-weight: bold;">Nom :        </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.firstName}</span></div>
                <div ><span style ="font-weight: bold;">Prénom :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.lastName}</span></div>
                <div ><span style ="font-weight: bold;">Téléphone :  </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.phone}</span></div>
                <div ><span style ="font-weight: bold;">Message :    </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.message}</span></div>
        
                <div style="font-weight: bold; font-size :1.2em;">Vous trouverez le CV en pièce jointe </div>
            </div>
        </div>`, // plain text body
            attachments: [{
                filename: req.file.filename,
                path: req.file.path,
            }]
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error :', err)
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