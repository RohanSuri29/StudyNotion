const jwt = require('jsonwebtoken');

async function authentication(req , res , next){
    
    try{

        const token = req?.body?.token || req?.cookies?.token || req?.header('Authorization').replace('Bearer ' , "");

        if (!token) {
            return res.status(404).json({
                success:false,
                message:'Token is missing'
            })
        };

        try{

            const decode = jwt.verify(token , process.env.Secret_Key);
            req.user = decode;
        }
        catch(error){
            console.error(error);
            return res.status(403).json({
                success:false,
                message:"Unable to verify token"
            })
        }
        next();
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Authentication Failed'
        })
    }

};

module.exports = authentication;