import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutIncrement = mongooseSequence(mongoose);

const AccountSchema = mongoose.Schema({
  agency:{
    type: Number,
    default: 1,
  },

  numberAccount:{
    type: Number,
    unique:true,
  },
  
  active:{
    type: Boolean,
    default: true,
  },

  balance: {
    type: Number,
    default: 10,
  },

  created_at:{
    type: Date,
    default: Date.now(),
  },

  update_at:{
    type: Date,
    default: Date.now(),
  },

});

AccountSchema.plugin(AutIncrement, {
  inc_field: 'numberAccount',
  start_seq: 1000,
});

export default mongoose.model('Account', AccountSchema);