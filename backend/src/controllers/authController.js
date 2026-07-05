export const registerUser=async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const loginUser=async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};