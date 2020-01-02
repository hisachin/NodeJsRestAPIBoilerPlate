import moment from 'moment';

/**
 * Import all models here
 */
const Users = require('./userModel');

 /**
  * Import all lib and helper functions here
  */
 import {
    generateUserTokenAndPassword,
    EmailService,
    DateHelper,
    CustomError,
    QueryBuilder
} from 'utils';
import { Serialize } from '../../utils/helper/serialize';

export class UserService{
    constructor(email,data){
        this._userData = data;
        this._userEmail = email
    }

    /**
     * this method is used to check if email is exists in the system
     */
    async isEmailExists(){
        const user = await Users.find({"email" : this._userEmail});
        
        if(user.length == 0){
            return false;
        }

        return true;
    }

    /**
     * this method is used to create new user in the system
     */
    async create(){
        try{

            if(await this.isEmailExists()){
                throw new CustomError('EmailAlreadyExist');
            }

            const { accountVeriToken, password , hashedPassword,salt} = await generateUserTokenAndPassword();

            const tmpUser = {
                username : this._userData.email,
                password : hashedPassword,
                salt : salt,
                email : this._userData.email,
                entityId : this._userData._id,
                entityType : this._userData.type,
                userType : 'Superadmin',
                accountVerificationToken : accountVeriToken,
                accountVerificationTokenExpiryDate : moment().add(10, 'minutes')
            }

            const user = await Users.create(tmpUser);

            if(!user){
                throw new Error('Something Went Wrong');
            }

            //sending email 
            const Email = new EmailService(user.email,'registration', {password,accountVeriToken});
            Email.send();

            return {
                success : { 
                    data : user 
                }
            }
            
        }catch(error){
            return {
                error : error
            }
        }
    }

    static async getAllUsers(query){
        try{
            
            const queryData = await QueryBuilder.User(query);
        
            const userSchema = {email:1,username:1,isVerified:1,createdAt:1,updatedAt:1};

            const users = await Users.find(queryData.match,userSchema).sort(queryData.sort).skip(queryData.skip).limit(queryData.perPageCount);

            return {
                success : { 
                    count : users.length,
                    data : users
                }
            }
        }catch(error){
            return {
                error : error
            }
        }
    }

    static async getUserById(userId){
        try{

            const user = await Users.findById(userId);

            if(!user){
                 throw new CustomError('UserNotFound');
            }


            return {
                success : { 
                    data : await Serialize.User(user)
                }
            }
        }catch(error){
            return {
                error : error
            }
        }
    }

    static async updateUser(query,data){
        try{

            const isUpdated = await Users.update(query,data);

            if(isUpdated.nModified === 0){
                throw new Error('Something Went wrong');
            }
            return {
                success : { 
                    data : true
                }
            }
        }catch(error){
            return {
                error : error
            }
        }
    }

    static async deleteUser(query){
        try{

            const isDeleted = await Users.remove(query);

            if(!isDeleted){
                throw new Error('Something Went wrong');
            }

            return {
                success : { 
                    data : true 
                }
            }
        }catch(error){
            return {
                error : error
            }
        }
    }
}