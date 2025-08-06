import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { ChunkDocument } from './chunk.schema';

@Controller('chunk')
export class ChunkController {
    constructor(private readonly chunkService: ChunkService) {}

    @Get(':page_id')
    async getChunks(@Param('page_id') page_id: string) {
        return this.chunkService.getChunks(page_id);
    }

    @Post()
    async createChunk(@Body() chunk: ChunkDocument) {
        return this.chunkService.createChunk(chunk);
    }

    @Put(':chunk_id')
    async updateChunk(@Param('chunk_id') chunk_id: string, @Body() chunk: ChunkDocument) {
        return this.chunkService.updateChunk(chunk_id, chunk);
    }

    @Delete(':chunk_id')
    async deleteChunk(@Param('chunk_id') chunk_id: string) {
        return this.chunkService.deleteChunk(chunk_id);
    }
}
