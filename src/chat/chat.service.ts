import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatDocument } from './chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
    constructor(@InjectModel('Chat') private readonly chatModel: Model<ChatDocument>) {}

    async getChat(sectionID: string, pagination: { page: number; limit: number }) {
        return this.chatModel
            .find({ section: sectionID })
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit)
            .exec();
    }

    async createChat(newData: ChatDocument) {
        const chat = new this.chatModel(newData);
        return chat.save();
    }

    async updateChat(chatID: string, newData: ChatDocument) {
        return this.chatModel.findByIdAndUpdate(chatID, newData, { new: true }).exec();
    }
}
