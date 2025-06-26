
async function adminHandler(req , res , next) {

    try{

        const role = req?.user?.accountType;

        if(role !== 'Admin') {
            return res.status(403).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        };

        next();
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

module.exports = adminHandler;