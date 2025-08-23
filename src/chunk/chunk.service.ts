import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChunkDocument } from './chunk.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChunkService {
    constructor(@InjectModel('Chunk') private readonly chunkModel: Model<ChunkDocument>) {}

    async getChunks(pageID: string) {
        return this.chunkModel.find({ page: pageID }).exec();
    }

    async createChunks(chunkPage: string, chunkSection: string, chunkData: string[]) {
        for (let i = 0; i < chunkData.length; i++) {
            const chunk = chunkData[i];
            await this.chunkModel.create([{
                page: chunkPage,
                data: chunk,
                index: i,
                embedding: [],
                section: chunkSection,
                },
            ]);
        }
    }

    async deleteChunk(chunkID: string) {
        return this.chunkModel.deleteOne({ _id: chunkID }).exec();
    }

    async updateChunk(chunkID: string, newData: ChunkDocument) {
        return this.chunkModel.findByIdAndUpdate(chunkID, newData, { new: true }).exec();
    }
}
