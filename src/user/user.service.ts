import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async getUserByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async createUser(userData: Partial<User>): Promise<UserDocument> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async updateUserByEmail(email: string, updateData: Partial<User>): Promise<UserDocument> {
        const updatedUser = await this.userModel.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new NotFoundException(`User with email ${email} not found.`);
        }

        return updatedUser;
    }

    async deleteUserByEmail(email: string): Promise<boolean> {
        const result = await this.userModel.deleteOne({ email }).exec();
        return result.deletedCount > 0;
    }

    async doesUserAlreadyExist(email: string): Promise<boolean> {
        const user = await this.userModel.exists({ email });
        return !!user;
    }
}