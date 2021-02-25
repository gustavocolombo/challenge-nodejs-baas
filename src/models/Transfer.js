import { Schema, model } from 'mongoose';

const schema = new Schema({
  account_sender:{
    type: Schema.Types.ObjectId,
    ref: "Account",
  },

  account_recipient:{
    type: Schema.Types.ObjectId,
    ref: "Account",
  },

  value:{
    type: Number,
    default:"0"
  },

  createdAt:{
    type: Date,
    default: Date.now(),
  },

  updateAt:{
    type: Date,
    default: Date.now(),
  },

},{
  versionKey: false
});

export default model("Transfer", schema, "transfers");