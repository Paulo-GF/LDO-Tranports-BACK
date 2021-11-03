const validatorModule = {
    // example : validatorModule.isCorrect(addJobSchema),
    isCorrect:(schema)=>{
        return (req,res,next)=>{
           console.log(schema);
            const {error} = schema.validate(req.body);
            console.log(req.body);

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
