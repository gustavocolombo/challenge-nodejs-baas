import {Schema, model} from 'mongoose';

const schema = new Schema({
  id_sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  id_recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default model("Transfer",schema,"transfers");