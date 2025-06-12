import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Friend, FriendDocument } from "./friend.schema";

@Injectable()
export class FriendService {
    constructor(
        @InjectModel(Friend.name) private readonly friendModel: Model<FriendDocument>
    ) {}

    async createFriendList(data: Partial<Friend>): Promise<FriendDocument> {
        const newEntry = new this.friendModel(data);
        return newEntry.save();
    }

  async getFriendList(userId: string): Promise<FriendDocument> {
    const friendList = await this.friendModel.findOne({ user: userId }).populate("friends").exec();

    if (!friendList) {
        throw new NotFoundException("Friend list not found")
    };

    return friendList;
  }

    async updateFriendList(userId: string, friendIds: string[]): Promise<FriendDocument> {
        const updated = await this.friendModel.findOneAndUpdate(
            { user: userId },
            { $set: { friends: friendIds } },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException("Friend list not found")
        };

        return updated;
    }

    async deleteFriendList(userId: string): Promise<boolean> {
        const result = await this.friendModel.deleteOne({ user: userId }).exec();
        return result.deletedCount > 0;
    }
}