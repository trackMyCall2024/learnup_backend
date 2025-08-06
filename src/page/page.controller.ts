import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PageDocument } from './page.schema';
import { PageService } from './page.service';
import { ChunkService } from 'src/chunk/chunk.service';

@Controller('page')
export class PageController {
    constructor(
        private readonly pageService: PageService,
        private readonly chunkService: ChunkService,
    ) {}

    @Get(':section_id')
    async getPages(@Param('section_id') section_id: string) {
        console.log(`getPages: ${section_id}`);
        const pages = await this.pageService.getPages(section_id);
        const pagesWithChunks = [];

        for (const [index, page] of pages.entries()) {
            const chunks = await this.chunkService.getChunks(page._id.toString());
            pagesWithChunks.push({
                title: `Page ${index + 1}`,
                data: chunks.map((chunk) => chunk.data).join(''),
            });
        }

        return pagesWithChunks;
    }

    @Post()
    async createPage(@Body() newData: PageDocument) {
        return this.pageService.createPage(newData);
    }

    @Delete(':page_id')
    async deletePage(@Param('page_id') page_id: string) {
        return this.pageService.deletePage(page_id);
    }

    @Put(':page_id')
    async updatePage(@Param('page_id') page_id: string, @Body() newData: PageDocument) {
        return this.pageService.updatePage(page_id, newData);
    }
}
