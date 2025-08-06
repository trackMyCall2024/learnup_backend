import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDocument } from './chat.schema';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get(':section_id')
    async getChat(@Param('section_id') section_id: string) {
        return this.chatService.getChat(section_id);
    }

    @Post()
    async createChat(@Body() newData: ChatDocument) {
        return this.chatService.createChat(newData);
    }

    @Put(':chat_id')
    async updateChat(@Param('chat_id') chat_id: string, @Body() newData: ChatDocument) {
        return this.chatService.updateChat(chat_id, newData);
    }
}
