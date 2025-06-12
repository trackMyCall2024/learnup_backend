import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blocker, BlockerDocument } from "./blocker.schema";

@Injectable()
export class BlockerService {
    constructor(
        @InjectModel(Blocker.name) private readonly blockerModel: Model<BlockerDocument>,
    ) {}

    async createBlocker(data: Partial<Blocker>): Promise<BlockerDocument> {
        const newBlocker = new this.blockerModel(data);
        return newBlocker.save();
    }

    async getBlocker(userId: string): Promise<BlockerDocument> {
        const blocker = await this.blockerModel.findOne({ user: userId }).exec();

        if (!blocker) {
            throw new NotFoundException("Blocker not found")
        };
        
        return blocker;
    }

    async updateBlocker(userId: string, websites: string[]): Promise<BlockerDocument> {
        const updated = await this.blockerModel.findOneAndUpdate(
        { user: userId },
        { $set: { websites } },
        { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException("Blocker not found")
        };

        return updated;
    }

    async deleteBlocker(userId: string): Promise<boolean> {
        const result = await this.blockerModel.deleteOne({ user: userId }).exec();
        return result.deletedCount > 0;
    }
}