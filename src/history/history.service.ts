import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { History, HistoryDocument } from './history.schema';
import { DirectoryType } from 'src/directory/directory.schema';

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History.name) private historyModel: Model<HistoryDocument>) {}

    async createHistoryList(data: Partial<History>): Promise<HistoryDocument> {
        const newEntry = new this.historyModel(data);
        return newEntry.save();
    }

    async getHistoryList(userId: string, directoryType: DirectoryType): Promise<any> {
        const history = await this.historyModel
            .findOne({ user: userId })
            .populate(`history.${directoryType}`)
            .exec();

        if (!history) {
            throw new NotFoundException('History not found');
        }

        return history.history[directoryType];
    }

    async updateHistoryList(
        userId: string,
        newItemId: string,
        directoryType: DirectoryType,
    ): Promise<HistoryDocument> {
        const historyDoc = await this.historyModel.findOne({ user: userId }).exec();

        if (!historyDoc) {
            throw new NotFoundException('History not found');
        }

        // Copy data
        let listId = [...(historyDoc.history[directoryType] as ObjectId[])].map((id) =>
            id.toString(),
        );

        // Remove the element if it already exists
        console.log({ newItemId }, { listId });

        listId = listId.filter((id) => id !== newItemId);

        // Add ID to the top
        listId.unshift(newItemId);

        if (listId.length > 4) {
            // Cut copy (max lenght 4)
            listId = listId.slice(0, 4);
        }

        const updated = await this.historyModel.findOneAndUpdate(
            { user: userId },
            { $set: { [`history.${directoryType}`]: listId } },
            { new: true },
        );

        if (!updated) {
            throw new NotFoundException('History list not found');
        }

        return updated;
    }

    async doesHistoryAlreadyExist(userId: string): Promise<boolean> {
        const historyId = await this.historyModel.exists({ user: userId });
        return !!historyId;
    }
}
