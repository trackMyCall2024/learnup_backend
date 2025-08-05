import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { ChunkDocument } from './chunk.schema';

@Controller('chunk')
export class ChunkController {
    constructor(private readonly chunkService: ChunkService) {}

    @Get(':sectionID')
    async getChunk(@Param('sectionID') sectionID: string) {
        return this.chunkService.getChunk(sectionID);
    }

    @Post()
    async createChunk(@Body() chunk: ChunkDocument) {
        return this.chunkService.createChunk(chunk);
    }

    @Put(':chunkID')
    async updateChunk(@Param('chunkID') chunkID: string, @Body() chunk: ChunkDocument) {
        return this.chunkService.updateChunk(chunkID, chunk);
    }

    @Delete(':chunkID')
    async deleteChunk(@Param('chunkID') chunkID: string) {
        return this.chunkService.deleteChunk(chunkID);
    }
}
