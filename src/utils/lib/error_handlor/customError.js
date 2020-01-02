import {
    HttpCode
} from 'utils/helper/httpCode'

export class CustomError extends Error{
    constructor(errorType , errorMsg, ...params){
        super(...params);       
        this.name = errorType;
        this.msg = errorMsg;
        this.customErrorObj(errorType);
    }

    customErrorObj(errorType){
        switch(errorType){
            case 'AuthenticationTokenError':
                this.authenticationTokenError();
                break;
            case 'AuthenticationError':
                this.authenticationError();
                break;    
            case 'MissingFieldError':
                this.missingFieldError();
                break;
            case 'UrlNotFound':
                this.urlNotFound();
                break;
            case 'EmailAlreadyExist':
                this.emailAlreadyExist();
                break;
            case 'UserNotFound':
                this.userNotFound();
                break;
            case 'UnverifiedAccount':
                this.unverifiedAccount();
                break; 
            case 'LockedAccount':
                this.lockedAccount();
                break;       
            default:
                this.defaultError();                   
        }
    }

    defaultError(){
        this.message = 'Something Went Wrong';
        this.code = HttpCode['Not_Implemented'];
    }

    authenticationTokenError(){
        this.message = 'Invalid token';
        this.code = HttpCode['Unauthorized'];
    }

    authenticationError(){
        this.message = 'Invalid Password/email';
        this.code = HttpCode['Unauthorized'];
    }

    missingFieldError(){
        this.message = 'Required Field Is Missing';
        this.code = HttpCode['Not_Acceptable'];
    }

    urlNotFound(){
        this.message = this.msg;
        this.code = HttpCode['Not_Found'];
    }

    emailAlreadyExist(){
        this.message = 'Entity with provided email already exists';
        this.code = HttpCode['Conflict'];
    }

    userNotFound(){
        this.message = 'No User Found';
        this.code = HttpCode['Not_Found'];
    }

    unverifiedAccount(){
        this.message = 'Your account is not verified yet. Please verify first.';
        this.code = HttpCode['Not_Found'];
    }

    lockedAccount(){
        this.message = 'Your account is locked due to invalid activity. Please contact to support team';
        this.code = HttpCode['Not_Found'];
    }

}