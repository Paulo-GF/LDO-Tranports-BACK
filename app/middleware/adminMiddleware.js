// const adminMiddleware = {

//     isAdmin: function (req, res, next){
//         const user = await userModel.getUser(form);
//         //je teste si on est connecté et qu'on possède le rôle admin
//         if(req.session.user && req.session.user.role == "admin"){
//             next();
//         }
//         else{
//             // j'envoie une erreur 403 - forbidden
//             return res.status(403).json("Accès refusé, veuillez contacter l'administrateur");
//         }
//     }
// };

// module.exports = adminMiddleware;

