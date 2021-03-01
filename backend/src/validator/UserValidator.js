import * as yup from 'yup';
import { Validation } from '../shared';

const { isNotValid, isRequired, notBlank } = Validation;

function validateSchema(operation){
  switch(operation){
    default:
      return yup.object().shape({
        email: yup.string().email().typeError(isNotValid).required(isRequired),
        password: yup.string().min(6, notBlank).required(isRequired),
      })
  }
}

export default function validate(data, operation = 'store'){
  if(data){
    return validateSchema(operation).strict().validate(data);
  }  
}

