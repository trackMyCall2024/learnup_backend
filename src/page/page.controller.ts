import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PageDocument } from './page.schema';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Get(':sectionID')
    async getPages(@Param('sectionID') sectionID: string) {
        return this.pageService.getPages(sectionID);
    }

    @Post()
    async createPage(@Body() newData: PageDocument) {
        return this.pageService.createPage(newData);
    }

    @Delete(':pageID')
    async deletePage(@Param('pageID') pageID: string) {
        return this.pageService.deletePage(pageID);
    }

    @Put(':pageID')
    async updatePage(@Param('pageID') pageID: string, @Body() newData: PageDocument) {
        return this.pageService.updatePage(pageID, newData);
    }
}