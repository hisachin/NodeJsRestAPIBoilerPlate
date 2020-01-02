import express from 'express';

let router = express.Router();

 /**
  * Import all services here
  */

 import { UserService } from './userService';


  /**
  * Import all lib and helper functions here
  */
 import {
    Response,
    validateRequest,
    verifyToken
} from 'utils';


const createUser = async(req ,res, next) => {
    const userData = req.body;

    const User = new UserService(userData.email,userData);

    const { error, success } = await User.create();

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success',"NewEntity");
        return res.status(201).json(responseObj);
    }
}

const getAllUsers = async (req ,res, next) => {
    
    try{
        const { query } = req;

        const { error , success } = await UserService.getAllUsers(query);

        if(error){
            next(error);
        }
    
        if(success){
            const responseObj = new Response('success','fetched Successfully',success);
            return res.status(200).json(responseObj);
        }
    }catch(e){
        next(e);
    }

}

const getSingleUser = async (req ,res, next) => {
    const { userId } = req.params;

    const { error , success } = await UserService.getUserById(userId);

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success','fetched Successfully',success.data);
        return res.status(200).json(responseObj);
    }
}

const updateSignleUser = async (req ,res, next) => {
    const { userId } = req.params;

    const dataToUpdate = req.body;

    const query = {"_id" : userId};

    const { error , success } = await UserService.updateUser(query,dataToUpdate);

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success','DetailsUpdated');
        return res.status(200).json(responseObj);
    }
}

const deleteSingleUser= async (req ,res, next) => {
    const { userId } = req.params;

    const query = {"_id" : userId};

    const { error , success } = await UserService.deleteUser(query);

    if(error){
        next(error);
    }

    if(success){
        const responseObj = new Response('success','DetailsDeleted');
        return res.status(200).json(responseObj);
    }
}


/**
 * Routes for user defined below
 */

router.post('/', [verifyToken,validateRequest],createUser);
router.get('/',[verifyToken],getAllUsers)
router.get('/:userId', [verifyToken],getSingleUser);
router.put('/:userId',[verifyToken],updateSignleUser);
router.delete('/:userId',[verifyToken],deleteSingleUser);


module.exports = router;