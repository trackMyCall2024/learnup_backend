import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDocument } from './chat.schema';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get(':sectionID')
    async getChat(
        @Param('sectionID') sectionID: string,
        @Query('pagination') pagination: { page: number; limit: number },
    ) {
        return this.chatService.getChat(sectionID, pagination);
    }

    @Post()
    async createChat(@Body() newData: ChatDocument) {
        return this.chatService.createChat(newData);
    }

    @Put(':chatID')
    async updateChat(@Param('chatID') chatID: string, @Body() newData: ChatDocument) {
        return this.chatService.updateChat(chatID, newData);
    }
}
