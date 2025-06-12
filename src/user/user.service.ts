import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async getUserByToken(token: string): Promise<User> {
        return await this.userModel.findOne({ token });
    }

    async createUser(user: User) {
        const newUser = await this.userModel.create(user);
    }

    async putUser(user: UserDocument) {
        await this.userModel.findOneAndUpdate({ email: user.email }, user);
    }

    async doesUserAlreadyExist(email: string) {
        const user = await this.userModel.findOne({ email });

        console.log('User db', user, !!user);
        
        return !!user;
    }
}
