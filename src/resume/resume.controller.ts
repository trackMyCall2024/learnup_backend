import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeDocument } from './resume.schema';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {}

    @Get(':sectionID')
    async getResume(@Param('sectionID') sectionID: string) {
        return this.resumeService.getResume(sectionID);
    }

    @Post()
    async createResume(@Body() newData: ResumeDocument) {
        return this.resumeService.createResume(newData);
    }

    @Put(':resumeID')
    async updateResume(@Param('resumeID') resumeID: string, @Body() newData: ResumeDocument) {
        return this.resumeService.updateResume(resumeID, newData);
    }   
}
