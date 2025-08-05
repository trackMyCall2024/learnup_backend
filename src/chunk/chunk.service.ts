import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChunkDocument } from './chunk.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChunkService {
    constructor(@InjectModel('Chunk') private readonly chunkModel: Model<ChunkDocument>) {}

    async getChunk(sectionID: string) {
        return this.chunkModel.find({ section: sectionID }).exec();
    }

    async createChunk(newData: ChunkDocument) {
        const chunk = new this.chunkModel(newData);
        return chunk.save();
    }

    async deleteChunk(chunkID: string) {
        return this.chunkModel.deleteOne({ _id: chunkID }).exec();
    }

    async updateChunk(chunkID: string, newData: ChunkDocument) {
        return this.chunkModel.findByIdAndUpdate(chunkID, newData, { new: true }).exec();
    }
}
