import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { Chapter } from './chapter.schema';

@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}

    @Post()
    async create(@Body() chapterData: Partial<Chapter>) {
        return this.chapterService.createChapter(chapterData);
    }

    @Post('all')
    async createBulk(@Body() chapterData: Partial<Chapter[]>) {

        for(const chapter of chapterData) {
            await this.chapterService.createChapter(chapter);
        }

        return 'ok';
    }

    @Get(':id')
    async getPaginated(
        @Param('id') courseId: string,
        @Query('page') page: string,
        @Query('search') search: string,
    ) {
        const pageNum = parseInt(page) || 1;
        return this.chapterService.getChaptersPaginated(courseId, search, pageNum);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: Partial<Chapter>) {
        return this.chapterService.updateChapter(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.chapterService.deleteChapter(id);
    }
}
