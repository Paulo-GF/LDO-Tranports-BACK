const nodemailer = require('nodemailer');
const { unlink } = require('fs');

const contactController = {
    sendMail: function (req, res) {
        console.log('##### BODY',req.body);
        console.log('##### FILES',req.file);

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
            from: `"Email:" <${req.body.userMail}>`, // sender address
            to: 'ldonodemailer@gmail.com', // list of receivers
            subject: req.body.subject, // Subject line
            html: `"Email:" <${req.body.userMail}> </br> message :${req.body.message}`, // plain text body
            attachments: [
                {
                    filename: req.file.filename,
                    path: req.file.path,
                }
            ]
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error :', err)
            } else {
                console.log('Email sent : ', info);
                unlink(req.files.path, (err) => {
                    if (err)  throw err;
                    console.log(`The file ${req.file.path}  was deleted`);
                });
            }
        })

        res.json({message : 'Youpi !'});
    }
};

module.exports = contactController;