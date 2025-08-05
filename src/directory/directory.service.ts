import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DirectoryDocument, DirectoryType } from './directory.schema';
import { Model } from 'mongoose';

@Injectable()
export class DirectoryService {
    constructor(
        @InjectModel('Directory') private readonly directoryModel: Model<DirectoryDocument>,
    ) {}

    async getDirectories(
        parentID: string,
        type: DirectoryType,
        pagination: { page: number; limit: number },
    ) {
        const directories = await this.directoryModel
            .find({ parentID, type })
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit)
            .exec();
        return directories;
    }

    async getAllDirectoriesIds(parentID: string, type: DirectoryType) {
        return this.directoryModel.find({ parentID, type }).exec();
    }

    async createDirectory(newData: DirectoryDocument) {
        const directory = new this.directoryModel(newData);
        return directory.save();
    }

    async deleteDirectory(directoryID: string) {
        return this.directoryModel.deleteOne({ _id: directoryID }).exec();
    }

    async updateDirectory(directoryID: string, newData: DirectoryDocument) {
        return this.directoryModel.findByIdAndUpdate(directoryID, newData, { new: true }).exec();
    }
}
