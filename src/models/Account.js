import { Schema, model } from 'mongoose';

const schema = new Schema({
  agency:{
    type: Number,
    default: "01",
  },

  numberAccount:{
    type: Number,
    unique:true,
  },

  account_id:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  balance:{
    type: Number,
    default: "0",
  },
  
  active:{
    type: Boolean,
    default: true,
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

export default model("Account", schema, "accounts")

/*
  accountSender:{
    type: Schema.Types.ObjectId,
    ref: "Account",
  },

  accountRecipient:{
    type: Schema.Types.ObjectId,
    ref: "Account",
  },

  value:{
    type: Number,
    default: 0
  },

  createdAt:{
    type: Date,
    default: Date.now(),
  },

  updateAt:{
    type: Date,
    default: Date.now(),
  },
*/