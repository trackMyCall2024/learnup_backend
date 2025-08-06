import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatDocument } from './chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
    constructor(@InjectModel('Chat') private readonly chatModel: Model<ChatDocument>) {}

    async getChat(section_id: string) {
        return this.chatModel.find({ section: section_id }).exec();
    }

    async createChat(newData: ChatDocument) {
        const chat = new this.chatModel(newData);
        return chat.save();
    }

    async updateChat(chatID: string, newData: ChatDocument) {
        return this.chatModel.findByIdAndUpdate(chatID, newData, { new: true }).exec();
    }
}
