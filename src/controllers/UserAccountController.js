import Account from '../models/Account';

export default class UserAccountController {

    async show(req, res) {
        const filters = req.filters;

        let userAccount = await Account.find(filters)
        res.send(userAccount)
    }
}