export class EmailService {
    constructor(email, emailType, data){
        this._SEND_EMAIL_TO = email,
        this.EMAIL_TYPE = emailType;
        this.EMAIL_CONTENT = data;
    }

    sendNewRegistrationEmail(){
        console.log("email send...", this._SEND_EMAIL_TO);
    }

    sendAccountVerifiedEmail(){
        console.log("email send...", this._SEND_EMAIL_TO);
    }

    sendForgotPasswordEmail(){
        console.log("email send...", this._SEND_EMAIL_TO);
    }

    sendResetPasswordEmail(){
        console.log("email send...", this._SEND_EMAIL_TO);
    }

    async send(){
        try{
            switch(this.EMAIL_TYPE){
                case 'registration' :
                    this.sendNewRegistrationEmail();
                    break;
                case 'accountVerified' :
                    this.sendAccountVerifiedEmail();
                    break;
                case 'forgotPassword' :
                    this.sendForgotPasswordEmail();
                    break;    
                case 'resetPassword' :
                    this.sendResetPasswordEmail();
                    break;    
                default:
                    return ;
            }

            return;
        }catch(error){
            console.log(error);
        }
    }
}