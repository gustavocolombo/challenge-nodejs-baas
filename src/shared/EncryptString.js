import bcrypt from 'bcryptjs';
import enviroment from '../configs/enviroment';

export const encryptText = (text) =>{
  const string = `${enviroment.encryptText}-${text}`
  let saltText = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND))
    return bcrypt.hashSync(string, saltText);
}

export const checkEncryptText = (text, checkText) =>{
  let textToCompare = `${process.env.encryptText}-${text}`
    return bcrypt.compareSync(textToCompare, checkText.toString());
}