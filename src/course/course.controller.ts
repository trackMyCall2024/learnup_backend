import { Controller, Get, Post, Body, Param, Query, Put, Delete } from "@nestjs/common";
import { CourseService } from "./course.service";
import { Course } from "./course.schema";

@Controller("course")
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post()
    async create(@Body() courseData: Partial<Course>) {
        return this.courseService.createCourse(courseData);
    }

    @Get()
    async getPaginated(@Query("page") page: string) {
        const pageNum = parseInt(page) || 1;
        return this.courseService.getCoursesPaginated(pageNum);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateData: Partial<Course>) {
        return this.courseService.updateCourse(id, updateData);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.courseService.deleteCourse(id);
    }
}