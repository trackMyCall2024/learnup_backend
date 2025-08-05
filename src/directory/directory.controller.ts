import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryDocument, DirectoryType } from './directory.schema';

@Controller('directory')
export class DirectoryController {
    constructor(private readonly directoryService: DirectoryService) {}

    @Get()
    async getDirectories(
        @Query('parentID') parentID: string,
        @Query('type') type: DirectoryType,
        @Query('pagination') pagination: { page: number; limit: number },
    ) {
        if (!parentID || !type || !pagination) {
            throw new BadRequestException('Invalid query parameters');
        }

        return this.directoryService.getDirectories(parentID, type, pagination);
    }

    @Post()
    async createDirectory(@Body() newData: DirectoryDocument) {
        return this.directoryService.createDirectory(newData);
    }

    @Delete(':directoryID')
    async deleteDirectory(@Param('directoryID') directoryID: string) {

    }

    @Put(':directoryID')
    async updateDirectory(@Param('directoryID') directoryID: string, @Body() newData: DirectoryDocument) {
        return this.directoryService.updateDirectory(directoryID, newData);
    }
}