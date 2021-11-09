const nodemailer = require('nodemailer');
const { unlink } = require('fs');

const contactController = {
    /**
     * Applying page : send notification mail for new job apply
     * @async
     * @param {userMail}
     * @param {firstName}
     * @param {lastName}
     * @param {subject}
     * @param {message}
     * @param {file}
     * @returns {sendMail} - Mail sent
     * @throws {Error} - status 400 (bad request) : Mail not sent
     */
    sendMail: function (req, res) {
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
        // Option a : without Attachments
        let mailOptions = {};
        if (!req.file) {
            mailOptions = {
                //userMail
                //firstName
                //LastName
                //subject
                //message
                //file
                from: `"Email:" <${req.body.userMail}>`, // sender address
                to: 'ldonodemailer@gmail.com', // list of receivers
                subject: req.body.subject, // Subject line
                html: `<div style="opacity: 0.9; background-repeat: no-repeat;; background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1744&q=80'); box-sizing: border-box; border-radius: 15px; width: 50vw; height: 80vh;">
    
                <div style="color: white; font-size: 1.9em; font-weight: bold; padding: 2em 2em 1em;"> Vous avez reçu une demande de contact à propos de : <span style="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px;">${req.body.subject}</span> </div>
                
                <div style = "color:white; height: 165vh; width: 60vw; font-size: 1.5em;">
                    
                    <div style = "margin: 2em; font-weight: bold; font-size :1.2em; text-decoration: underline; color:white;"> Informations du contact: </div>
                    
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">E-mail :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.userMail}</span></div>
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">Nom :        </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.firstName}</span></div>
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">Prénom :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.lastName}</span></div>
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">Message : <br> </span> <span style = "margin: 1em; line-height:2.3em;"">${req.body.message}</span></div>
            
                </div>
            </div>`, // plain text body
            };
        } else {
            // Options to define mail sending parameters
            // Option b : With Attachments
            mailOptions = {
                from: `"Email:" <${req.body.userMail}>`, // sender address
                to: 'ldonodemailer@gmail.com', // list of receivers
                subject: req.body.subject, // Subject line
                html: `<div style="opacity: 0.9; background-repeat: no-repeat;; background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1744&q=80'); box-sizing: border-box; border-radius: 15px; width: 50vw; height: 80vh;">
    
                <div style="color: white; font-size: 1.9em; font-weight: bold; padding: 2em 2em 1em;"> Vous avez reçu une demande de contact à propos de : <span style="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px;">${req.body.subject}</span> </div>
                
                <div style = "color:white; height: 165vh; width: 60vw; font-size: 1.5em;">
                    
                    <div style = "margin: 2em; font-weight: bold; font-size :1.2em; text-decoration: underline; color:white;"> Informations du contact: </div>
                    
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">E-mail :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.userMail}</span></div>
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">Nom :        </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.firstName}</span></div>
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">Prénom :     </span> <span style ="font-weight: bold; background-color: rgba(64, 194, 211, 0.589); border-radius: 10px; padding: 5px">${req.body.lastName}</span></div>
                    <div style = "margin: 2em;" ><span style ="font-weight: bold;">Message : <br> </span> <span style = "margin: 1em; line-height:2.3em;"">${req.body.message}</span></div>
            
                </div>
            </div>`, // plain text body
                attachments: [
                    {
                        filename: req.file.filename,
                        path: req.file.path,
                    }
                ]
            };
        }

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

        res.json({ message: 'Votre message est bien envoyé' });
    }
};

module.exports = contactController;