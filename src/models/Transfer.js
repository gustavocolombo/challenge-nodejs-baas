import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const Transferschema = mongoose.Schema({
  id_sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  id_recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updated_at:{
    type: Date,
    required: true,
    default: Date.now(),
  }
});

export default mongoose.model('Transfer', Transferschema);