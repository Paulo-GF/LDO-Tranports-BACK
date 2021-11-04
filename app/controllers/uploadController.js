const uploadController = {

    sendAttachment: async function (req, res) {
        try {
            if(!req.file) {
                throw console.error('Pièce jointe manquante');
                // alert('Pièce jointe manquante');
                // res.redirect('/contact');
            } else {
                // alert('Fichier chargé');
            }

        } catch (error){
            res.status(500).send(error.message);
        }
    },

};

module.exports = uploadController;