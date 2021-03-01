class ExceptionGlobalHandler{
  constructor(){
    this.errorTypes = {
      'MNGE': 'MongoError',
      'VLDE': 'ValidationError',
      'ATZE': 'AuthorizationError',
      'ITRE': 'InternalError',
    }
  }

  makeError(message = 'Internal Server Error', code = 500, type = 'ITRE'){ //por padrao é public 
    const nameError = (this.errorTypes[type]) ? this.errorTypes[type] : this.errorTypes['ITRE']

    return {
        message,
        code,
        name: nameError, 
    }
  }

  #handleMongoError(error) { 
    if(error.code && error.code === 11000 && error.keyPattern){
        const violatedKeys = Object.keys(error.keyPattern);
        return this.makeError(`${violatedKeys.join(',')} already exist`, 422, 'MNGE')
    }else if(error.message) {
        let errorCode = (error.code) ? error.code : 400;
        return this.makeError(error.message, errorCode, 'VDTE')
    }

    console.error(error);
    return this.makeError()

}

#handleYupError(error) {
    if(error.type && error.type === 'required' && error.path){
        return this.makeError(`${error.path} is required!`, 400, 'VDTE');
    }else if(error.message) {
        let errorCode = (error.code) ? error.code : 400;
        return this.makeError(error.message, errorCode, 'VDTE')
    }

    console.error(error);
    return this.makeError()
}

#handleAuthError(error) {
    if(error.message && error.code){
        return this.makeError(error.message, 403, 'ATHE')
    }else if(error.message) {
        let errorCode = (error.code) ? error.code : 403;
        return this.makeError(error.message, errorCode, 'ATHE')
    }

    console.error(error);
    return this.makeError()
}

  handle(error) {
    if(error){
        if(error.name === 'MongoError'){
            return this.#handleMongoError(error);
        }else if(error.name === 'ValidationError'){ 
            return this.#handleYupError(error);
        }else if(error.name === 'AuthorizationError'){
            return this.#handleAuthError(error);
        }
    }

    console.error(error);
    return this.makeError();
}

}

export default new ExceptionGlobalHandler();
