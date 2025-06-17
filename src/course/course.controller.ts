import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.schema';
import { LoggerService } from 'src/logger/logger.service';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly loggerService: LoggerService,
    ) {}

    @Post()
    async create(@Body() courseData: Partial<Course>) {
        return this.courseService.createCourse(courseData);
    }

    @Post('all')
    async createBulk(@Body() courseData: Partial<Course[]>) {
        for (const course of courseData) {
            await this.courseService.createCourse(course);
        }

        return 'ok';
    }

    @Get(':id')
    async getPaginated(
        @Query('page') page: string,
        @Param('id') userId: string,
        @Query('search') courseName: string,
    ) {
        this.loggerService.debug('arrived');
        const pageNum = parseInt(page) || 1;
        return this.courseService.getCoursesPaginated(userId, courseName, pageNum);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: Partial<Course>) {
        return this.courseService.updateCourse(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}
