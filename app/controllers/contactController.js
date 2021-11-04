const nodemailer = require('nodemailer');
const { unlink } = require('fs');


const contactController = {
    sendMail: function (req, res) {
        console.log('##### BODY',req.body);
        console.log('##### FILES',req.files);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ldonodemailer@gmail.com', // A faire : Créer un mail test
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            //userMail
            //subject
            //message
            //file
            from: req.body.userMail, // sender address
            to: 'ldonodemailer@gmail.com', // list of receivers
            subject: req.body.subject, // Subject line
            html: req.body.message, // plain text body
            attachments: [
                {
                    filename: req.files.filename,
                    path: req.files.path,
                    //contentType: 'application/pdf'// optional, would be detected from the filename
                }
            ]
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error :', err)
            } else {
                console.log('Email sent : ', info);
                // unlink(req.files.path, (err) => {
                //     if (err)  throw err;
                //     console.log(`The file ${req.files.path}  was deleted`);
                // });
            }
        })
    }
};

module.exports = contactController;