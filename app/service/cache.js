const cacheService = (client,expiration = 60*60*24) => { // default 24h
    const { promisify } = require("util");
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    const delAsync = promisify(client.del).bind(client);

    // save/retrieve data from cache
    const cache = async (req,res,next)=>{

        const result = await getAsync(req.url); 

        if(result){
            res.json(result);
        }
        else{
            // save in originalJSON a bind of res.json
            const originalJSON = res.json.bind(res);

            // we want to get controlle result
            res.json = async (json) => {
                // here the cache has a 24h lifetime
                await setAsync(req.url , JSON.stringify(json), 'EX', expiration);


                // equals to the res.json(json) in our controller;
                originalJSON(json);
            };

            next();
        }
    }

    // empty and refresh cache with new data
    const flush = async (req,_,next)=>{
        // delete key and value of redis
        await delAsync(req.url);

        next();
    }

    return {
        cache,flush
    };

};

module.exports = cacheService;
