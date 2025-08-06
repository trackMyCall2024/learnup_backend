import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeDocument } from './resume.schema';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {}

    @Get(':section_id')
    async getResume(@Param('section_id') section_id: string) {
        return this.resumeService.getResume(section_id);
    }

    @Post()
    async createResume(@Body() newData: ResumeDocument) {
        return this.resumeService.createResume(newData);
    }

    @Put(':resume_id')
    async updateResume(@Param('resume_id') resume_id: string, @Body() newData: ResumeDocument) {
        return this.resumeService.updateResume(resume_id, newData);
    }   
}
