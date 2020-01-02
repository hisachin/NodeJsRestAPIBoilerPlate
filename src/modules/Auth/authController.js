import express from 'express';

let router = express.Router();

 /**
  * Import all services here
  */

import { AuthService } from './authService';
import { UserService } from 'modules/Users/UserService'; 


 /**
  * Import all lib and helper functions here
  */
 import {
    Response,
    validateRequest,
    generateToken
} from 'utils';


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const register = async (req ,res, next) => {

    const userData = req.body;

    const AUTH = new AuthService(userData);
 
    const { error, success } = await AUTH.register();

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success',"NewEntity");
        return res.status(201).json(responseObj);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const login = async (req ,res, next) => {
    const loginDetails = req.body;

    const AUTH = new AuthService(loginDetails);
 
    const { error, success } = await AUTH.login();

    if(error){
        next(error);
    }

    if(success){

        const token = await generateToken(success.data);

        const data = {
            "token" : token
        }

        const responseObj = new Response('success',"LoggedIn",data);
        return res.status(200).json(responseObj);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const verifyAccount = async (req, res, next ) => {
    const { token } = req.params;

    const { error ,success } = await AuthService.verifyAccount(token);

    if(error){
        next(error);
    }

    if(success){

        const responseObj = new Response('success','AccountVerified');
        return res.status(200).json(responseObj);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const forgotPassword = async (req ,res, next) => {
    const { email } = req.body;

    const { error ,success } = await AuthService.forgotPassword(email);

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success',"ForgotPassword");
        return res.status(200).json(responseObj);
    }
}   


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const resetPassword = async (req ,res, next) => {
    const { token } = req.params;

    const { error ,success } = await AuthService.resetPassword(token);

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success',"ResetPassword");
        return res.status(200).json(responseObj);
    }
}

const test = async (req ,res ,next)=>{
    
    try{
        const responseObj = new Response('success',"ResetPassword");
        return res.status(200).json(responseObj);
    }catch(e){
        console.log(e);
        next(e);
    }
}
/**
 * Routes for authentication and authrization is defined below
 */
router.post('/signup', [validateRequest],register);
router.post('/login', [validateRequest],login);
router.get('/verify/:token', verifyAccount);
router.post('/forgot-password',forgotPassword);
router.get('/reset-password/:token', resetPassword);

router.get('/test',test);

module.exports = router;