import { User } from "../models";
import { AppError } from "../shared";
import { getMessage } from "../shared";

export default class UsersRepository {
    /**
     * List all users in DB
     * @param {string[]} [filters=[]]
     * @memberof UserRepository
    */

    async findAll(filters = {}){
        let users = await User
            .find(filters)
            .select("-password");

        return users
    }

    /**
     * List all users in DB filtering by e-mail and return the encoded password
     * @param {string} email
     * @memberof UserRepository
    */

   async findOneByEmail(email){
        let foundUser = await User
            .findOne({
                email: email
            });
        
        if(!foundUser) {
            throw new AppError(getMessage('userNotFound')(email), 'MongoError', 404);
        }

        return foundUser    
    }

    /**
     * @param {string} email
     * @memberof UserRepository
    */

   async checkToCreate(email){
        let foundUser = await User
            .findOne({
                email: email
            });
        
        if(foundUser) {
            throw new AppError(getMessage('accountAlreadyUsed')(email), 'MongoError', 404);
        }

        return foundUser    
    }       
    
    /**
     * Store an User in DB
     * @param {User} user
     * @memberof UserRepository
    */

    async store(user){
        let checkUser = await User.checkToCreate(user);

        if(checkUser) throw new AppError(getMessage('accountAlreadyUsed')(email), 'MongoError', 404);

        let storedUser = await User.create(user);
        return storedUser;

    }

    /**
     * Update an User in DB
     * @param {User} user
     * @param {number} id
     * @memberof UserRepository
    */

    
    async update(user, id){
        let foundUser = await User
            .findById(id)
            .select("-password");

        delete user["password"];

        if(!foundUser) {
            throw new AppError(getMessage('userNotFound')(id), 'MongoError', 404);
        }

        Object.keys(user).map(key => {
            foundUser[key] = user[key]
        })

        await foundUser.save();

        return user;
    }

    /**
     * Delete an User in DB
     * @param {number} id
     * @memberof UserRepository
    */
    async delete(id){
        let foundUser = await UserModel.findById(id);

        if(!foundUser) {
            throw new AppError(getMessage('userNotFound')(id), 'MongoError', 404);
        }

        await User.deleteOne({ _id: id });

        return `User with id ${id} deleted!`;
    }
}