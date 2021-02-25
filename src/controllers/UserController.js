import jwt from "jsonwebtoken";
import environment from "../configs/enviroment";
import { UsersRepository } from "../repositories";
import { ExceptiontGlobalHandler, encryptText, checkEncryptText } from "../shared";
import { UserValidator } from "../validator";

export default class UserController {

    constructor(){
        this.repository = new UsersRepository();
    }

        async login(req, res) {
        try {
            const user = req.body;
    
            const foundUser = await this.repository.findOneByEmail(user.email);

            foundUser._doc.profile.roles.map((v, index) => foundUser._doc.profile.roles[index] = v.name);
    
            const validPass = checkEncryptText(user.password, foundUser.password);
    
            if(!validPass) {
                throw ExceptiontGlobalHandler.makeError(`Invalid password!`, 401, 'VDTE')
            }

            const token = jwt.sign({
                id: foundUser._id,
                email: foundUser.email,
                profile: foundUser.profile.name,
                roles: foundUser.profile.roles
                },
                environment.privateJWT,
                { expiresIn: "7d" }
            )

            const returnUser = Object.assign({}, foundUser._doc)

            delete returnUser['password']
            
            return res.send({
                user: returnUser,
                token: token,
            })
        }catch (error) {
            const sanitizedError = ExceptiontGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }


    }

    async listUsers(req, res) {
        const filters = req.filters;

        let users = await this.repository.findAll(filters)
        res.send(users)
    }

    async saveUser(req, res) {
        try {
            const user = req.body;

            await UserValidator(user)

            user.password = encryptText(user.password)

            let savedUser = await this.repository.store(user)
            res.send(savedUser)
        } catch (error){
            const sanitizedError = ExceptiontGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;

            await UserValidator(body)

            let updatedUser = await this.repository.update(body, id)
            res.send(updatedUser)
        } catch (error){
            const sanitizedError = ExceptiontGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            await this.repository.delete(id)
            res.json({
                message: `User with id ${id} successful deleted!`
            })
        } catch (error){
            const sanitizedError = ExceptiontGlobalHandler.handle(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }
}