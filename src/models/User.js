import { Schema, model } from 'mongoose';
import { uuid } from 'uuidv4';

const schema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true,
  },

  password:{
    type: String,
    required: true,
    default: ""
  },

  telephone:{
    type: String,
    required: false,
    unique: true,
  },

  createdAt:{
    type: Date,
    default: Date.now()
  },

  updateAt:{
    type: Date,
    default: Date.now()
  }
},{
    versionKey: false,
  }
);

export default model("User", schema, "users");