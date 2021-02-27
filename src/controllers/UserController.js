import { ExceptionGlobalHandler, encryptText } from "../shared";
import { UserValidator } from "../validator";
import User from '../models/User';

export default class UserController {

    async show(req, res) {
        const filters = req.filters;

        let users = await User.find(filters)
        res.send(users)
    }

    async saveUser(req, res) {
        try {
            const user = req.body;

            await UserValidator(user)

            user.password = encryptText(user.password)

            let savedUser = await User.create(user)
            res.send(savedUser)
        } catch (error){
            const sanitizedError = ExceptionGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async update(req, res) {
        try {
            const { email, oldPassword } = req.body;
            const { id } = req.params;
            const userValidate = req.body;

            const userIsValid = await UserValidator(userValidate);

            if (!userIsValid) {
                return res.status(400).json({ message : 'User not found' })
            }
                
            let user = await User.findById(id);
            
            if (email && email !== user.email) {
                const userExist = await User.findOne({ email });
                    if (userExist) {
                        return res.status(400).json({ error: 'Email already exists.' });
                    }
            }
        
            user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        
            Object.assign(user, { password: undefined });
        
            return res.json(user);

        } catch (error){
            const sanitizedError = ExceptionGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await User.findByIdAndDelete(id)
            res.json({
                message: `User with id ${id} successful deleted!`
            })
        } catch (error){
            const sanitizedError = ExceptionGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }
}