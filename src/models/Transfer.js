import {Schema, model} from 'mongoose';

const schema = new Schema({
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
    default: "0"
  },

  createdAt:{
    type: Date,
    default: Date.now(),
  },

  updateAt:{
    type: Date,
    default: Date.now(),
  },
});

export default model("Transfer",schema,"transfers");