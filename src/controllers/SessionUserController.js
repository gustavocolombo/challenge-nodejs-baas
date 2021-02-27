import jwt from "jsonwebtoken";
import enviroment from "../configs/enviroment";
import User from '../models/User';
import { ExceptionGlobalHandler, checkEncryptText } from "../shared";

export default class SessionUserController {

    async store(req, res) {
        try {
            const { email, password } = req.body;
            const user = req.body;

            const foundUser = await User.findOne({ email });

            const validPass = checkEncryptText(user.password, foundUser.password);

                if(!validPass) {
                    throw ExceptionGlobalHandler.makeError(`Invalid password!`, 401, 'VDTE')
                }

                    const token = jwt.sign({
                        id: foundUser._id,
                        email: foundUser.email,
                        },
                        enviroment.privateJwt,
                        { expiresIn: "7d" }
                    )

                    const returnUser = Object.assign({}, foundUser._doc)

                    delete returnUser['password']
                    
                    return res.send({
                        user: returnUser,
                        token: token,
                })
        }catch (error) {
            const sanitizedError = ExceptionGlobalHandler.handle(error);

            console.log(error);

            res.status(sanitizedError.code).send(sanitizedError)
        }
    }
  }