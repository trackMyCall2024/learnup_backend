import { Controller, Get, Post, Body, Param, Query, Put, Delete } from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { Chapter } from "./chapter.schema";

@Controller("chapter")
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

    @Post()
    async create(@Body() chapterData: Partial<Chapter>) {
        return this.chapterService.createChapter(chapterData);
    }

    @Get()
    async getPaginated(@Query("page") page: string) {
        const pageNum = parseInt(page) || 1;
        return this.chapterService.getChaptersPaginated(pageNum);
    }

    @Put(":id")
        async update(@Param("id") id: string, @Body() updateData: Partial<Chapter>) {
        return this.chapterService.updateChapter(id, updateData);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.chapterService.deleteChapter(id);
    }
}