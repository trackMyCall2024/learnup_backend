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

    async getBlocker(userId: string): Promise<BlockerDocument[]> {
        const blockers = await this.blockerModel.find({ user: userId }).exec();

        if (!blockers) {
            throw new NotFoundException("Blocker not found")
        };
        
        return blockers;
    }

    async updateBlocker(websiteId: string, website: string): Promise<BlockerDocument> {
        const updated = await this.blockerModel.findOneAndUpdate(
        { _id: websiteId },
        { $set: { website } },
        { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException("Blocker not found")
        };

        return updated;
    }

    async deleteBlocker(websiteID: string): Promise<boolean> {
        const result = await this.blockerModel.deleteOne({ _id: websiteID }).exec();
        return result.deletedCount > 0;
    }
}