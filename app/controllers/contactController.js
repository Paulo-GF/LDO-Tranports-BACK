const nodemailer = require('nodemailer');

const contactController = {
    sendMail: function(req, res){
       // { userMail, subject, file, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test@gmail.com', // A faire : Créer un mail test
                pass: process.env.MAIL_PASSWORD
            }
        });
        
        const mailOptions = {
            from: req.body.userMail, // sender address
            to: 'test@gmail.com', // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.message,
            html: '<h1>this is a test mail.</h1>', // plain text body
            attachments: [
                {
                    filename: req.body.file,
                    content: 'test d\'un pdf',
                    //contentType: 'application/pdf'// optional, would be detected from the filename
                }
            ]
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log('Error :',err)
            else
                console.log('Email sent : ',info);
        })
    }
};

module.exports = contactController;

// [
//     {   // utf-8 string as an attachment
//         filename: 'text1.txt',
//         content: 'hello world!'
//     },
//     {   // binary buffer as an attachment
//         filename: 'text2.txt',
//         content: new Buffer('hello world!','utf-8')
//     },
//     {   // file on disk as an attachment
//         filename: 'text3.txt',
//         path: '/path/to/file.txt' // stream this file
//     },
//     {   // filename and content type is derived from path
//         path: '/path/to/file.txt'
//     },
//     {   // stream as an attachment
//         filename: 'text4.txt',
//         content: fs.createReadStream('file.txt')
//     },
//     {   // define custom content type for the attachment
//         filename: 'text.bin',
//         content: 'hello world!',
//         contentType: 'text/plain'
//     },
//     {   // use URL as an attachment
//         filename: 'license.txt',
//         path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
//     },
//     {   // encoded string as an attachment
//         filename: 'text1.txt',
//         content: 'aGVsbG8gd29ybGQh',
//         encoding: 'base64'
//     },
//     {   // data uri as an attachment
//         path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
//     }
// ]
