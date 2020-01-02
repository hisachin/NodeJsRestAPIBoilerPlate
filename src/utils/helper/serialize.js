export class Serialize{

    static async User(data){
        const {
            _id,
            email,
            username,
            isVerified,
            isLocked,
            entityId,
            entityType,
            userType
        } = data;
    
        return {
            email,
            username,
            isVerified,
            isLocked,
            entityId,
            entityType,
            userType
        }
    }
}