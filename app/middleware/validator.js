const { unlink } = require('fs');

const validatorModule = {
    
    /**
     * Data validator when create new job, update a job or edit password
     * @param {addJobSchema}
     * @param {passwordSchema}
     * @param {updateJobSchema}
     * @return - next() if ok
     * @throws {Error} - status 400 (bad request): incorrect or undefined informations
     */
    isCorrect:(schema)=>{
        return (req,res,next)=>{
        //console.log('####### schema');
        //console.log(schema);
            const {error} = schema.validate(req.body);
            // console.log('####### body joi');
            // console.log(req.body);

            if(error){
                console.log("cette saisie n'est pas conforme",error);
                res.status(400).json({message : "cette saisie n'est pas conforme", error});
                unlink(req.files.path, (err) => {
                    if (err) throw err;
                    console.log(`The file ${req.file.path}  was deleted`);
                });
            }
            else{
                next();
            }
        };
    }
};

module.exports = validatorModule;
