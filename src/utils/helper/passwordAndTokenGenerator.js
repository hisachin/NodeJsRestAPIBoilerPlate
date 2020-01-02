import generator from 'generate-password';
import crypto from 'crypto';

const generateUserTokenAndPassword = async () => {
    
    const { accountVeriToken } = await generateUserToken();

    const { hashedPassword,password,salt } = await passwordGenerator();

    return {
        accountVeriToken,
        password,
        hashedPassword,
        salt
    }
}

const passwordGenerator = async () => {
    const password = await generator.generate({
        length: 10,
        numbers: true
    });

    const salt = crypto.randomBytes(16).toString('hex'); 
    const hashedPassword = crypto.pbkdf2Sync(password, salt,  1000, 64, `sha512`).toString(`hex`);

    return {
        hashedPassword,
        password,
        salt
    }
}

const validatePassword = async(hashedPassword, salt, password) => {
    let hash = crypto.pbkdf2Sync(password,  salt, 1000, 64, `sha512`).toString(`hex`);

    return hashedPassword === hash;
}

const generateUserToken = async () => {
    const buf =  crypto.randomBytes(20);
    const accountVeriToken = buf.toString('hex');

    return accountVeriToken;
}

module.exports = {
    generateUserTokenAndPassword,
    validatePassword,
    passwordGenerator,
    generateUserToken
}