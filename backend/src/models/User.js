import mongoose from 'mongoose';
import Account from './Account';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  account_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
});

UserSchema.pre('save', async function save(next) {
  const user = this;
  const createAccount = await Account.create({});
  user.account_id = createAccount;

  next();
})

export default mongoose.model('User', UserSchema);
