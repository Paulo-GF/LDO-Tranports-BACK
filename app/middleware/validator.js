const validatorModule = {
    // example : validatorModule.isCorrect(addJobSchema),
    isCorrect:(schema)=>{
        return (req,res,next)=>{
            // validate retourne {value,error}, je choisis ici de faire de la destructuration pour ne récupérer que error
            const {error} = schema.validate(req.body);

            if(error){
                console.log("cette saisie n'est pas conforme",error);
                res.status(400).json({message : "cette saisie n'est pas conforme", error});
            }
            else{
                next();
            }
        };
    }
};

module.exports = validatorModule;
