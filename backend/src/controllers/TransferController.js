import * as Yup from 'yup';
import Transfer from '../models/Transfer';
import Account from '../models/Account';

export default class TransferController {
  async store(req, res) {
    try{
      const schema = Yup.object().shape({
        id_recipient: Yup.string().required(),
        value: Yup.number().positive().required(),
      });
  
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }
  
      const { id: id_sender } = req.params;
      const { id_recipient, value } = req.body;
  
      const userSend = await Account.findById(id_sender);
      const userRecipient = await Account.findById(id_recipient);
  
      if (!userSend) {
        return res.status(400).json({ error: 'Invalid user submission' });
      }
  
      if (!userRecipient) {
        return res.status(400).json({ error: 'Invalid user submission' });
      }
  
      if (userSend.balance - value < 0) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
  
      let balance = userSend.balance - value;
      await userSend.updateOne({ balance });
  
      balance = userRecipient.balance + value;
      await userRecipient.updateOne({ balance });
  
      Object.assign(req.body, { id_sender });
      let transfer = await Transfer.create(req.body);
  
      transfer = await transfer.populate({ path: 'id_recipient', select: 'id_recipient' }).execPopulate();
  
      return res.json(transfer);
    } catch(error) {
      const sanitizedError = ExceptionGlobalHandler.handle(error);

      res.status(sanitizedError.code).send(sanitizedError)
    }
  }
};
