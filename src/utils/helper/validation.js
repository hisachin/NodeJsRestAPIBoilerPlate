const validateRequest = async (req,res,next) => {
    try{
        const validationType = req.body.type
        let error;

        switch(validationType) {
            case 'brand':
                error = await validateBrandRegistrationRequest(req.body);
                break;
            case 'login':
                error = await validateLoginRequest(req.body);
                break;
            default:
                return next();
        }

        if(error){
            throw new Error(error);
        }else{
            return next();
        }
    }catch(error){
        next(error);
    }
}

const validateBrandRegistrationRequest = async (data) => {
    const { name,company,email } = data;

    let error;

    if(!name){
        error = 'Name Parameter is missing';
    }

    if(!company){
        error = 'Company Parameter is missing';
    }

    if(!email){
        error = 'Email Parameter is missing';
    }

    return error;
}

const validateLoginRequest = async (data) => {
    const { email,password } = data;

    let error;

    if(!email){
        error = 'Email Parameter is missing';
    }

    if(!password){
        error = 'Password Parameter is missing';
    }

    return error;
}

module.exports = {
    validateRequest
}