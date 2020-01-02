export class Response{
    constructor(ResponseCodeName = 'success',ResponseMsg = "",ResponseData = null){

        this.status = ResponseCodeName;
        
        if(ResponseMsg){
            this.getResponsMsg(ResponseMsg);
        }

        if(ResponseData){
            this.data = ResponseData;
        }
    }

    getResponsMsg(ResponseMsg){
        switch(ResponseMsg){
            case 'NewEntity':
                this.newEntity();
                break;
            case 'LoggedIn':
                this.loggedIn();
                break;
            case 'AccountVerified':
                this.accountVerified();
                break;
            case 'ForgotPassword':
                this.forgotPassword();
                break;
            case 'ResetPassword':
                this.resetPassword();
                break;
            case 'DetailsUpdated':
                this.detailsUpdated();
                break;
            case 'DetailsDeleted':
                this.detailsDeleted();
                break;
            default:
                this.message = ResponseMsg;
                
        }
    }

    newEntity(){
        this.message = 'Account has been created successfully';
    }

    loggedIn(){
        this.message = 'Login Susscessfully';
    }

    accountVerified(){
        this.message = 'Your Account has been verified successfully';
    }

    forgotPassword(){
        this.message = 'An Email to reset the password has been sent to your registedred Email';
    }

    resetPassword(){
        this.message = 'Your Password has been reset successfully';
    }

    detailsUpdated(){
        this.message = 'Details has been updated successfully';
    }

    detailsDeleted(){
        this.message = 'Details has been deleted successfully';
    }


}