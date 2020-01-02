import moment from 'moment';

/**
 * Import all models here
 */
 const Brands = require('modules/Brands/brandModel');
 const Users = require('modules/Users/userModel');
 const ResetPasswordToken = require('modules/Auth/resetPasswordToken');

 /**
  * Import all services here
  */

import { UserService } from 'modules/Users/UserService';  

 /**
  * Import all lib and helper functions here
  */
 import {
    generateUserTokenAndPassword,
    validatePassword,
    Serialize,
    EmailService,
    DateHelper,
    generateUserToken,
    CustomError
} from 'utils';


export class AuthService {
    constructor(userData){
        this._userType = userData.type;
        this._userData = userData;
    }

    /**
     * this method is used to check if email is exists in the system
     */
    async isEmailExists(){
        const brand = await Brands.find({"email" : this._userData.email});

        if(brand.length == 0){
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {registration data} data 
     */
    async registerUser(data) {
        try{
            data.type = this._userType;

            const User = new UserService(this._userData.email,data);

            const { error, success } = await User.create();

            if(error){
                throw new Error(error);
            }

            return success.data;

        }catch(error){
            throw new Error(error);
        }

    }

    /**
     * this method is used to register a new user in the system
     */
    async register(){
        try{

            if(await this.isEmailExists()){
                throw new CustomError('EmailAlreadyExist');
            }

            let brand = await Brands.create(this._userData);

            let user = await this.registerUser(brand);

            if(!user){
                throw new Error('Something Went Wrong');
            }

            return {
                success : {
                    data : this._userData
                }
            };
        }catch(error){
            return {
                error : error
            }
        }
    }

    /**
     * this method is used to login into the system
     */
    async login(){
        try{
            const user = await Users.findOne({"email" : this._userData.email});

            if(!user){
                throw new CustomError('UserNotFound');
            }

            if(!user.isVerified){
                throw new CustomError('UnverifiedAccount');
            }

            if(user.isLocked){
                throw new CustomError('LockedAccount');
            }

            const isPasswordValid = await validatePassword(user.password, user.salt,this._userData.password);

            if(!isPasswordValid){
                throw new CustomError('AuthenticationError');
            }

            return {
                success : {
                    data : await Serialize.User(user)
                }
            };

        }catch(error){
            return {
                error : error
            }
        }
    }

    /**
     * this method is used to verify the user account after the refistration 
     * from the link send to them into thier provided email id
     * @param {token which is used to verify the user account} token 
     */
    static async verifyAccount(token){
        try{
            const user =  await Users.findOne({"accountVerificationToken": token});

            if(!user){
                throw new CustomError('AuthenticationTokenError');
            }

            if(await DateHelper.isDateAfter(user.accountVerificationTokenExpiryDate)){
                throw new CustomError('AuthenticationTokenError');
            }

            const updateUser = await Users.updateOne({"email": user.email}, {$set : { "isVerified" : true, "accountVerificationToken" : null, "accountVerificationTokenExpiryDate" : null}});

            if(updateUser.nModified == 0){
                throw new Error('Something Went Wrong');
            }

            //sending email 
            const Email = new EmailService(user.email,'accountVerified');
            Email.send();

            return {
                success : true
            }
        }catch(error){
            return {
                error : error
            }
        }
    }
    
    static async forgotPassword(email){
        try{
            const userService = new UserService(email);

            const isEmailExists = userService.isEmailExists();

            if(!isEmailExists){
                throw new CustomError('UserNotFound');
            }

            const accountVeriToken = await generateUserToken();

            const resetPasswordURL = `${global.gConfig.API_URL}/api/v1/auth/reset-password/${accountVeriToken}`;

            const tempObj = {
                email : email,
                token : accountVeriToken,
                expiryDate : moment().add(10, 'minutes')
            }

            const isTokenSaved = await ResetPasswordToken.create(tempObj);

            if(!isTokenSaved){
                throw new Error('Something went wrong');
            }


            //sending email 
            const Email = new EmailService(email,'forgotPassword',{resetPasswordURL});
            Email.send();

            return {
                success : true
            }

        }catch(error){
            return {
                error : error
            }
        }
    }

    /**
     * this method is used to reset the user password after request
     * from the link send to them into thier provided email id
     * @param {token which is used to reset the password of the user} token 
     */
    static async resetPassword(token){
        try{
            const isTokenExists =  await ResetPasswordToken.findOne({"token": token});

            if(!isTokenExists){
                throw new CustomError('AuthenticationTokenError');
            }

            const { email , expiryDate} = isTokenExists;

            if(await DateHelper.isDateAfter(expiryDate)){
                throw new CustomError('AuthenticationTokenError');
            }

            const { password , hashedPassword,salt} = await generateUserTokenAndPassword();

            console.log(password);

            const updateUser = await Users.updateOne({"email": email}, {$set : { "password" : hashedPassword, "salt" : salt}});

            if(updateUser.nModified == 0){
                throw new Error('Something Went Wrong');
            }

            ResetPasswordToken.remove({"token": token});

            //sending email 
            const Email = new EmailService(email,'resetPassword', {email,password});
            Email.send();

            return {
                success : true
            }
        }catch(error){
            return {
                error : error
            }
        }
    }
}