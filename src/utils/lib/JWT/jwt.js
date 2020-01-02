import jwt from 'jsonwebtoken';

import {
    CustomError
} from '../error_handlor/customError';

const generateToken = async(data) => {
    return jwt.sign({ data: data }, global.gConfig.secret, { expiresIn: 86400 });
}

const verifyToken = async (req ,res , next) => {
    try{
        let token = req.headers['x-access-token'];
    
        if (!token){
            throw new CustomError('AuthenticationTokenError');
        } 
        
        jwt.verify(token,global.gConfig.secret , (err,decoded) => {
            if(err){
                throw new CustomError('AuthenticationTokenError');
            }
            
            return next();
        });
    }catch(error){
        next(error);
    }
}

module.exports = {
    generateToken,
    verifyToken
}