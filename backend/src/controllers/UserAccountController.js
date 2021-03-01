import Account from '../models/Account';
export default class UserAccountController {

    async show(req, res) {
        const filters = req.filters;

        let userAccount = await Account.find(filters)
        res.send(userAccount)
    }

    async index(req,res){
        const { id } = req.params;

        let checkIdValid = await Account.findById(id);

        if(!checkIdValid){
            return res.status(400).json({ message: 'This id is not available' });
        }

        res.json({
            message: `your balance is ${checkIdValid.balance} `
        });
    }
}