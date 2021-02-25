export default class AppError{
  constructor(name, message, code = 400){
    this.name = name;
    this.message = message;
    this.code = code;
  }
}